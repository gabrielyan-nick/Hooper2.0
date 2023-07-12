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
import { CourtService } from './court.service';
import { CourtDto, UpdateCourtDto } from './dto/court.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCourt(@Body() dto: CourtDto) {
    return this.courtService.createCourt(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/:courtId')
  async getCourt(@Param('courtId') courtId: string) {
    return this.courtService.getCourt(courtId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('/:courtId')
  async updateCourtInfo(
    @Param('courtId') courtId: string,
    @Body() dto: UpdateCourtDto,
  ) {
    return this.courtService.updateCourtInfo(courtId, dto);
  }
}
