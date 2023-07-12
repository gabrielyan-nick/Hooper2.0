import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { ICourt } from '../court.types';
import { Message } from './schemas/message.schema';
import { MessageDto } from './dto/message.dto';
import { TMessage } from './chat.types';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createChat({ _id }: Pick<ICourt, '_id'>): Promise<Chat> {
    const newChat = await this.chatModel.create({
      court: _id,
    });

    return newChat;
  }

  async getChatMessages(
    chatId: string,
    offset: number,
    limit: number,
  ): Promise<Message[]> {
    try {
      const chat = await this.chatModel.findById(chatId);
      if (!chat) throw new NotFoundException('Chat not found');

      const messages = await this.messageModel
        .find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate('sender', 'avatar _id');

      if (!messages) throw new NotFoundException('Messages not found');

      return messages;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async postChatMessage(
    chatId: string,
    userId: string,
    dto: MessageDto,
  ): Promise<Message> {
    try {
      const chat = await this.chatModel.findById(chatId);
      if (!chat) throw new NotFoundException('Chat not found');

      const message: TMessage = await this.messageModel.create({
        chat: chatId,
        sender: userId,
        text: dto.text,
      });

      await this.chatModel.findByIdAndUpdate(chatId, {
        $push: { messages: message._id },
      });

      return message;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateChatMessage(messageId: string, dto: MessageDto) {
    try {
      const updatedMessage = await this.messageModel.findByIdAndUpdate(
        messageId,
        { text: dto.text },
        { new: true },
      );

      return updatedMessage;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteChatMessage(messageId: string) {
    try {
      const deletedMessage = await this.messageModel.findByIdAndDelete(
        messageId,
      );

      if (!deletedMessage) {
        throw new NotFoundException('Message not found');
      }

      await this.chatModel.updateMany(
        { messages: messageId },
        { $pull: { messages: messageId } },
      );

      return { message: 'Successful' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
