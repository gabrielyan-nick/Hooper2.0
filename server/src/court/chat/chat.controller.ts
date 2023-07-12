import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(200)
  @Get('/:chatId')
  async getChatMessages(
    @Param('chatId') chatId: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return this.chatService.getChatMessages(chatId, offset, limit);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/:chatId')
  async postChatMessage(
    @Param('chatId') chatId: string,
    @Body() dto: MessageDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.chatService.postChatMessage(chatId, userId, dto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put('/message/:messageId')
  async updateChatMessage(
    @Param('messageId') messageId: string,
    @Body() dto: MessageDto,
  ) {
    return this.chatService.updateChatMessage(messageId, dto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/message/:messageId')
  async deleteChatMessage(@Param('messageId') messageId: string) {
    return this.chatService.deleteChatMessage(messageId);
  }
}
