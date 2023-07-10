import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { AuthDto, LoginDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { citiesCoords } from 'src/data/cities.data';
import { IUser } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);
      const user = await this.userModel.findOne({ _id: result.id });

      return this.getUserDataWithTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    return this.getUserDataWithTokens(user);
  }

  //   async googleLogin(req) {
  //     const id: string = req.id;
  //     const name: string = req.name.givenName;
  //     const email: string = req.emails[0].value;

  //     const userData = await this.prisma.user.findUnique({
  //       where: { googleId: id },
  //     } as Prisma.UserFindUniqueArgs);

  //     if (userData) return this.getUserDataWithTokens(userData);
  //     else {
  //       const user = await this.prisma.user.create({
  //         data: {
  //           email: email,
  //           name: name,
  //           googleId: id,
  //         },
  //       });

  //       return this.getUserDataWithTokens(user);
  //     }
  //   }

  async register(dto: AuthDto) {
    const existEmail = await this.userModel.findOne({ email: dto.email });
    if (existEmail)
      throw new BadRequestException('User with this email already exists');

    const existUsername = await this.userModel.findOne({
      username: dto.username,
    });
    if (existUsername)
      throw new BadRequestException('User with this username already exists');

    const hashPassword = await argon2.hash(dto.password);
    const coordinates = citiesCoords[dto.city.value];

    const newUser = await this.userModel.create({
      ...dto,
      password: hashPassword,
      city: {
        value: dto.city.value,
        label: dto.city.label,
        coordinates,
      },
    });

    return this.getUserDataWithTokens(newUser);
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await argon2.verify(user.password, dto.password);
    if (!isValid) throw new NotFoundException('Invalid password');

    return user;
  }

  private getUserDataWithTokens(user: IUser) {
    const tokens = this.issueTokens(user._id);

    return { user: this.returnUserFields(user), ...tokens };
  }

  private issueTokens(userId: Types.ObjectId) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: IUser) {
    return {
      id: user._id,
      email: user.email,
      googleId: user.googleId,
      username: user.username,
      city: user.city,
    };
  }
}
