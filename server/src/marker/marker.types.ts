import { Types } from 'mongoose';
import { EnumCourtSport, ICourt } from 'src/court/court.types';

export interface IMarker {
  _id: Types.ObjectId;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  court: {
    sport: EnumCourtSport;
    onCourtPlayers: IOnCourtPlayer[];
  };
}

export type TMarkerCreate = Pick<ICourt, '_id' | 'geometry'>;

export interface IOnCourtPlayer {
  _id: Types.ObjectId;
  createdAt: Date;
}
