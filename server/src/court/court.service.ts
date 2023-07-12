import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Court } from './schemas/court.schema';
import { Model } from 'mongoose';
import { MarkerService } from 'src/marker/marker.service';
import { ChatService } from './chat/chat.service';
import { CourtDto, UpdateCourtDto } from './dto/court.dto';
import { EnumCourtSport, TCourt } from './court.types';
import { TChat } from './chat/chat.types';

@Injectable()
export class CourtService {
  constructor(
    @InjectModel(Court.name) private courtModel: Model<Court>,
    private marker: MarkerService,
    private chat: ChatService,
  ) {}

  async createCourt(dto: CourtDto): Promise<Court> {
    try {
      const newCourt: TCourt = await this.courtModel.create({ ...dto });

      await this.marker.createMarker({
        _id: newCourt._id,
        geometry: newCourt.geometry,
      });

      const newChat: TChat = await this.chat.createChat({
        _id: newCourt._id,
      });

      const updatedCourt = await this.courtModel.findByIdAndUpdate(
        newCourt._id,
        {
          chat: newChat._id,
        },
      );

      return updatedCourt;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getCourt(id: string) {
    try {
      const court = await this.courtModel.findById(id).populate({
        path: 'chat',
        populate: {
          path: 'messages',
          options: { sort: { createdAt: -1 }, limit: 3 },
          populate: {
            path: 'sender',
            select: 'avatar',
          },
        },
      });

      if (!court) {
        throw new NotFoundException('Court not found');
      }

      return court;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateCourtInfo(courtId: string, dto: UpdateCourtDto) {
    try {
      const court = await this.courtModel.findById(courtId);
      if (!court) {
        throw new NotFoundException('Court not found');
      }

      if (dto.photos) {
        if (
          court.photos.length === 1 &&
          court.photos[0].startsWith('/assets')
        ) {
          court.photos = [dto.photos];
        } else {
          court.photos.unshift(dto.photos);
        }
        court.photos = [...new Set(court.photos)];
        await court.save();
      } else {
        const updatedCourt = await this.courtModel.findByIdAndUpdate(
          courtId,
          { ...dto },
          { new: true },
        );

        if (dto.sport && dto.sport !== court.sport) {
          if (
            court.photos.length === 1 &&
            court.photos[0].startsWith('/assets')
          ) {
            if (updatedCourt.sport === EnumCourtSport.BASKETBALL)
              court.photos.splice(0, 1, '/assets/basketball-court.jpg');
            else if (updatedCourt.sport === EnumCourtSport.FOOTBALL)
              court.photos.splice(0, 1, '/assets/football-court.jpg');
            await court.save();
          }
        }
      }

      const updCourt = await this.courtModel.findById(courtId);

      return updCourt;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
