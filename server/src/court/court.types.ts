import { Types } from 'mongoose';
import { Court } from './schemas/court.schema';

export enum EnumCourtSport {
  BASKETBALL = 'basketball',
  FOOTBALL = 'football',
}

export enum EnumCourtSportClient {
  BASKETBALL = 'Баскетбольний майданчик',
  FOOTBALL = 'Футбольне поле',
}

export enum EnumBasketballCover {
  RUBBER = 'rubber',
  ASPHALT = 'asphalt',
  BETON = 'beton',
  INDOOR = 'indoor',
}

export enum EnumFootballCover {
  NATURAL = 'natural',
  SYNTHETIC = 'synthetic',
  INDOOR = 'indoor',
}

export enum EnumAllCover {
  RUBBER = 'rubber',
  ASPHALT = 'asphalt',
  BETON = 'beton',
  INDOOR = 'indoor',
  NATURAL = 'natural',
  SYNTHETIC = 'synthetic',
}

export interface ICourt {
  _id?: Types.ObjectId;
  sport: EnumCourtSport;
  name: string;
  cover: EnumAllCover;
  lighting: boolean;
  hoopsCount: number;
  description: string;
  photos: string[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  onCourtPlayers?: {
    _id: Types.ObjectId;
    createdAt: Date;
  }[];
  checkinPlayers?: {
    _id: Types.ObjectId;
    createdAt: Date;
  }[];
  chat: Types.ObjectId;
}

export type TCourt = Court & {
  _id: Types.ObjectId;
};
