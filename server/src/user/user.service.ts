import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Court } from 'src/court/schemas/court.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Court.name) private courtModel: Model<Court>,
  ) {}

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async toggleFavouriteCourts(userId: string, courtId: string) {
    try {
      const user = await this.findById(userId);
      const court = await this.courtModel.findById(courtId);
      if (!court) {
        throw new NotFoundException('Court not found');
      }

      const isFavourite = user.favCourts.some(
        court => court.toString() == courtId,
      );

      if (isFavourite) {
        user.favCourts = user.favCourts.filter(
          court => court.toString() != courtId,
        );
      } else {
        user.favCourts.push(courtId as unknown as Court);
      }

      await user.save();

      return user.favCourts;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
