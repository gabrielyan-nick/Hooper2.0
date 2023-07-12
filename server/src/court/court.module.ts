import { Module } from '@nestjs/common';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { MarkerService } from 'src/marker/marker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Court, CourtSchema } from './schemas/court.schema';
import { Marker, MarkerSchema } from 'src/marker/schemas/marker.schema';
import { Chat, ChatSchema } from './chat/schemas/chat.schema';
import { Message, MessageSchema } from './chat/schemas/message.schema';

@Module({
  controllers: [CourtController, ChatController],
  providers: [CourtService, ChatService, MarkerService],
  imports: [
    ChatModule,
    MongooseModule.forFeature([{ name: Court.name, schema: CourtSchema }]),
    MongooseModule.forFeature([{ name: Marker.name, schema: MarkerSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
})
export class CourtModule {}
