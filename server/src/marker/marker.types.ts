import { Types } from 'mongoose';
import { EnumCourtSport } from 'src/court/court.types';

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

export interface IOnCourtPlayer {
  _id: Types.ObjectId;
  createdAt: Date;
}
