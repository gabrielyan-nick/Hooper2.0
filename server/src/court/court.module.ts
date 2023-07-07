import { Module } from '@nestjs/common';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [CourtController, ChatController],
  providers: [CourtService, ChatService],
  imports: [ChatModule],
})
export class CourtModule {}
