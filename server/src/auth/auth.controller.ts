import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // async googleLogin() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleLoginRedirect(@Req() req, @Res() res) {
  //   const url = `https://spacejam-shop.vercel.app/google-redirect?data=${encodeURIComponent(
  //     JSON.stringify(req.user),
  //   )}`;

  //   return res.redirect(url);
  // }
}
