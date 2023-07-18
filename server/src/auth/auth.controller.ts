import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ForgotPassDto, LoginDto, ResetPassDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private user: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPassDto) {
    return this.authService.forgotPassword(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPassDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser('_id') id: string) {
    return this.user.findById(id);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req, @Res() res) {
    const url = `https://spacejam-shop.vercel.app/google-redirect?data=${encodeURIComponent(
      JSON.stringify(req.user),
    )}`;

    return res.redirect(url);
  }
}
