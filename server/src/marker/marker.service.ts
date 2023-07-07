import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './schemas/marker.schema';
import { Model } from 'mongoose';
import { IMarker } from './marker.types';

@Injectable()
export class MarkerService {
  constructor(@InjectModel(Marker.name) private markerModel: Model<Marker>) {}

  async getAllMarkers(): Promise<IMarker[]> {
    const markers: IMarker[] = await this.markerModel.find().populate({
      path: 'properties.courtId',
      select: 'players',
    });

    if (!markers) throw new NotFoundException('Markers not found');

    return markers;
  }
}
