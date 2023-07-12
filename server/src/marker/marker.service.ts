import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './schemas/marker.schema';
import { Model } from 'mongoose';
import { IMarker, TMarkerCreate } from './marker.types';
import { EnumCourtSport } from 'src/court/court.types';

@Injectable()
export class MarkerService {
  constructor(@InjectModel(Marker.name) private markerModel: Model<Marker>) {}

  async getAllMarkers(): Promise<IMarker[]> {
    const markers: IMarker[] = await this.markerModel.find().populate({
      path: 'court',
      select: 'onCourtPlayers sport',
    });

    if (!markers) throw new NotFoundException('Markers not found');

    return markers;
  }

  async createMarker({ _id, geometry }: TMarkerCreate): Promise<Marker> {
    const newMarker = await this.markerModel.create({
      court: _id,
      geometry,
    });

    return newMarker;
  }
}
