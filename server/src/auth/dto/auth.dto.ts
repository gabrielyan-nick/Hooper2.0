import {
  IsEmail,
  MinLength,
  IsString,
  MaxLength,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;

  @MaxLength(20, { message: 'Maximum 20 characters' })
  @MinLength(2, { message: 'Minimum 2 characters' })
  @IsString()
  username: string;

  @ValidateNested()
  @IsObject()
  city: { label: string; value: string };
}

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;
}

export class ForgotPassDto {
  @IsEmail()
  email: string;
}

export class ResetPassDto {
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;

  @IsString()
  token: string;
}
