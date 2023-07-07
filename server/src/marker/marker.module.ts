import { Module } from '@nestjs/common';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Marker, MarkerSchema } from './schemas/marker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Marker.name, schema: MarkerSchema }]),
  ],
  controllers: [MarkerController],
  providers: [MarkerService],
})
export class MarkerModule {}
