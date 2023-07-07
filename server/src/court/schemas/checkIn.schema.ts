import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Court } from 'src/court/schemas/court.schema';

export type CheckInDocument = HydratedDocument<CheckIn>;

@Schema({ timestamps: true })
export class CheckIn {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Court' })
  court: Court;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
