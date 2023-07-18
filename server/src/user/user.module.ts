import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CourtService } from 'src/court/court.service';
import { Court, CourtSchema } from 'src/court/schemas/court.schema';
import { CheckIn, CheckInSchema } from 'src/court/schemas/checkIn.schema';
import { CourtModule } from 'src/court/court.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Court.name, schema: CourtSchema }]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
