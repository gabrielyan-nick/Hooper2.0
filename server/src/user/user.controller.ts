import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from './decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('/:courtId')
  async toggleFavouriteCourts(
    @CurrentUser('_id') userId: string,
    @Param('courtId') courtId: string,
  ) {
    return this.userService.toggleFavouriteCourts(userId, courtId);
  }
}
