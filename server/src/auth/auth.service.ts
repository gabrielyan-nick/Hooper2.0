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
import { AuthDto, ForgotPassDto, LoginDto, ResetPassDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { citiesCoords } from 'src/data/cities.data';
import { IUser } from 'src/user/user.types';
import { v4 as uuid } from 'uuid';
import { createTransport } from 'nodemailer';

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

  async googleLogin(req) {
    const googleId: string = req.id;
    const username: string = req.name.givenName;
    const email: string = req.emails[0].value;

    const userData = await this.userModel.findOne({ googleId });

    if (userData) return this.getUserDataWithTokens(userData);
    else {
      const newUser = await this.userModel.create({
        email,
        username,
        googleId,
      });

      return this.getUserDataWithTokens(newUser);
    }
  }

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
    const accessToken = this.jwt.sign(data, { expiresIn: '1d' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: IUser) {
    return {
      _id: user._id,
      email: user.email,
      googleId: user.googleId,
      username: user.username,
      city: user.city,
    };
  }

  async forgotPassword(dto: ForgotPassDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new NotFoundException('User not found');

    try {
      const resetToken = uuid();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000);
      await user.save();

      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_LOGIN,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_LOGIN,
        to: user.email,
        subject: 'Hooper, відновлення паролю',
        html: `
          <p>Щоб відновити ваш пароль, перейдіть за посиланням:</p>
          <a href="https://hooper-13.web.app/reset-password/${resetToken}">Відновити пароль</a>
          <p>Посилання дійсне протягом однієї години.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return { message: 'Password reset link has been sent to your email' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async resetPassword(dto: ResetPassDto) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: dto.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user)
        throw new BadRequestException(
          'Password reset link is invalid or has expired',
        );

      const hashedPassword = await argon2.hash(dto.password);
      user.password = hashedPassword;
      await user.save();
      await this.userModel.updateOne(
        { _id: user._id },
        { $unset: { resetPasswordToken: '', resetPasswordExpires: '' } },
      );

      return { message: 'Password changed successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
