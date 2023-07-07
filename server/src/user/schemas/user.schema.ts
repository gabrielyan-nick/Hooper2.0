import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CheckIn } from '../../court/schemas/checkIn.schema';
import { Court } from 'src/court/schemas/court.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, min: 2, max: 20, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 6 })
  password: string;

  @Prop({ default: '/assets/avatar.png' })
  avatar: string;

  @Prop({
    default: {
      isOnCourt: false,
      courtId: null,
    },
  })
  onCourt: {
    isOnCourt: boolean;
    court: {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Court';
    };
  };

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],
    default: [],
  })
  favCourts: Court[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],
    default: [],
  })
  addedCourts: Court[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CheckIn' }],
    default: [],
  })
  checkIns: CheckIn[];

  @Prop({ type: Map, of: String })
  socialLinks: Map<string, string>;

  @Prop({ required: true })
  city: {
    label: string;
    value: string;
    coordinates: number[];
  };

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
