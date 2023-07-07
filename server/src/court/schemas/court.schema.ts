import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  EnumAllCover,
  EnumCourtSport,
  EnumCourtSportClient,
} from '../court.types';
import { User } from 'src/user/schemas/user.schema';
import { Chat } from '../chat/schemas/chat.schema';

export type CourtDocument = HydratedDocument<Court>;

@Schema({ timestamps: true })
export class Court {
  @Prop({ enum: EnumCourtSport, required: true })
  sport: EnumCourtSport;

  @Prop({
    max: 23,
    default: function () {
      if (this.sport === EnumCourtSport.FOOTBALL)
        return EnumCourtSportClient.FOOTBALL;
      else return EnumCourtSportClient.BASKETBALL;
    },
  })
  name: string;

  @Prop({ enum: EnumAllCover, required: true })
  cover: EnumAllCover;

  @Prop({
    type: Boolean,
    default: function () {
      return this.cover === EnumAllCover.INDOOR;
    },
  })
  lighting: boolean;

  @Prop({ default: 2 })
  hoopsCount: number;

  @Prop({ max: 200, default: '' })
  description: string;

  @Prop({
    type: [String],
    default: function () {
      if (this.sport === EnumCourtSport.BASKETBALL) {
        return ['/assets/basketball-court.jpg'];
      } else if (this.sport === EnumCourtSport.FOOTBALL) {
        return ['/assets/football-court.jpg'];
      }
      return [];
    },
  })
  photos: string[];

  @Prop({
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  geometry: {
    type: string;
    coordinates: number[];
  };

  @Prop({
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  onCourtPlayers: {
    _id: User;
    createdAt: Date;
  }[];

  @Prop({
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  checkinPlayers: {
    _id: User;
    createdAt: Date;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chat: Chat;
}

export const CourtSchema = SchemaFactory.createForClass(Court);

CourtSchema.index({ geometry: '2dsphere' });
