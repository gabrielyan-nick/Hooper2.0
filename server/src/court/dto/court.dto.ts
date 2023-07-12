import {
  IsString,
  MaxLength,
  IsObject,
  ValidateNested,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { EnumAllCover, EnumCourtSport } from '../court.types';

export class CourtDto {
  @IsEnum(EnumCourtSport)
  sport: EnumCourtSport;

  @IsOptional()
  @IsString()
  @MaxLength(23, { message: 'Maximum 23 characters' })
  name?: string;

  @IsEnum(EnumAllCover)
  cover: EnumAllCover;

  @IsOptional()
  @IsBoolean()
  lighting?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  hoopsCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Maximum 200 characters',
  })
  description?: string;

  @IsOptional()
  @IsString()
  photos?: string;

  @ValidateNested()
  @IsObject()
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export class UpdateCourtDto {
  @IsOptional()
  @IsEnum(EnumCourtSport)
  sport?: EnumCourtSport;

  @IsOptional()
  @IsString()
  @MaxLength(23, { message: 'Maximum 23 characters' })
  name?: string;

  @IsOptional()
  @IsEnum(EnumAllCover)
  cover?: EnumAllCover;

  @IsOptional()
  @IsBoolean()
  lighting?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  hoopsCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Maximum 200 characters',
  })
  description?: string;

  @IsOptional()
  @IsString()
  photos?: string;
}
