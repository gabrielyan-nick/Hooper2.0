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
import { UserService } from 'src/user/user.service';
import { CheckIn } from './schemas/checkIn.schema';
import { AgendaService } from './agenda.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class CourtService {
  constructor(
    @InjectModel(Court.name) private courtModel: Model<Court>,
    @InjectModel(CheckIn.name) private checkInModel: Model<CheckIn>,
    @InjectModel(User.name) private userModel: Model<User>,
    private marker: MarkerService,
    private chat: ChatService,
    private user: UserService,
    private agenda: AgendaService,
  ) {}

  async findById(id: string) {
    const court = await this.courtModel.findById(id);
    if (!court) {
      throw new NotFoundException('Court not found');
    }

    return court;
  }

  async createCourt(dto: CourtDto, userId: string): Promise<Court> {
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

      await this.userModel.findByIdAndUpdate(userId, {
        $push: { addedCourts: newCourt._id },
      });

      return updatedCourt;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getCourt(id: string): Promise<Court> {
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

  async updateCourtInfo(courtId: string, dto: UpdateCourtDto): Promise<Court> {
    try {
      const court = await this.courtModel.findById(courtId);
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

  async checkIn(
    courtId: string,
    userId: string,
  ): Promise<Pick<User, 'onCourt'>> {
    try {
      const user = await this.user.findById(userId);
      const court = await this.findById(courtId);

      const isOnCourt = court.onCourtPlayers.some(
        user => user.user?.toString() === userId,
      );

      // Если пользователь на корте и не на текущем, тогда удаляем его с прошлого корта.
      if (
        user.onCourt.isOnCourt &&
        user.onCourt.court?.toString() !== courtId &&
        !isOnCourt
      ) {
        await this.courtModel.findByIdAndUpdate(user.onCourt.court, {
          $pull: { onCourtPlayers: { user: userId } },
        });
      }

      // Если пользователь не на текущем корте, тогда добаляем его.
      if (user.onCourt.court?.toString() !== courtId && !isOnCourt) {
        await this.courtModel.findByIdAndUpdate(courtId, {
          $push: { onCourtPlayers: { user: userId } },
        });

        const checkInIndex = court.checkinPlayers.findIndex(
          player => player.user?.toString() == userId,
        );

        if (checkInIndex !== -1) {
          court.checkinPlayers.splice(checkInIndex, 1);
          await court.save();
        }

        await this.courtModel.findByIdAndUpdate(courtId, {
          $push: { checkinPlayers: { user: userId } },
        });

        user.onCourt.isOnCourt = true;
        user.onCourt.court = courtId as unknown as Court;

        const checkIn = await this.checkInModel.create({
          user: userId,
          court: courtId,
        });

        user.checkIns.push(checkIn.id);

        await user.save();

        // добавляем задачу для удаления чекина
        const agenda = this.agenda.getAgenda();
        const jobName = `checkOut-user-${userId}`;
        const jobs = await agenda.jobs({ name: jobName });

        if (jobs.length > 0) {
          await agenda.cancel({ name: jobName });
        }

        agenda.define(jobName, async () => {
          await this.checkOut(courtId, userId);
        });

        const scheduleTime = new Date(new Date().getTime() + 2 * 60 * 1000);
        agenda.schedule(scheduleTime, jobName, {});

        return {
          onCourt: {
            isOnCourt: user.onCourt.isOnCourt,
            court: user.onCourt.court,
          },
        };
      } else {
        throw new BadRequestException('You are already on this court');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async checkOut(
    courtId: string,
    userId: string,
  ): Promise<Pick<User, 'onCourt'>> {
    try {
      const user = await this.user.findById(userId);
      const court = await this.findById(courtId);

      const isOnCourt = court.onCourtPlayers.some(
        user => user.user?.toString() == userId,
      );

      if (
        user.onCourt.isOnCourt &&
        user.onCourt.court?.toString() == courtId &&
        isOnCourt
      ) {
        await this.courtModel.findByIdAndUpdate(user.onCourt.court, {
          $pull: { onCourtPlayers: { user: userId } },
        });

        user.onCourt.isOnCourt = false;
        user.onCourt.court = undefined;
        await user.save();

        const agenda = this.agenda.getAgenda();
        const jobName = `checkOut-user-${userId}`;
        const jobs = await agenda.jobs({ name: jobName });

        if (jobs.length > 0) {
          await agenda.cancel({ name: jobName });
        }

        return {
          onCourt: {
            isOnCourt: user.onCourt.isOnCourt,
            court: user.onCourt.court,
          },
        };
      } else {
        throw new NotFoundException('You are not on this court');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
