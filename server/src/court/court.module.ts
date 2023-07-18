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
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { CheckIn, CheckInSchema } from './schemas/checkIn.schema';
import { AgendaService } from './agenda.service';

@Module({
  controllers: [CourtController, ChatController],
  providers: [
    CourtService,
    ChatService,
    MarkerService,
    UserService,
    AgendaService,
  ],
  imports: [
    ChatModule,
    MongooseModule.forFeature([{ name: Court.name, schema: CourtSchema }]),
    MongooseModule.forFeature([{ name: Marker.name, schema: MarkerSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
  ],
})
export class CourtModule {}
