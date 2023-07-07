import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumCourtSport } from 'src/court/court.types';
import { Court } from 'src/court/schemas/court.schema';

export type MarkerDocument = HydratedDocument<Marker>;

@Schema({ timestamps: true })
export class Marker {
  @Prop({ default: 'Feature' })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true })
  court: Court;

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
}

export const MarkerSchema = SchemaFactory.createForClass(Marker);
