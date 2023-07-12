import { Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';

export type TChat = Chat & {
  _id?: Types.ObjectId;
};

export type TMessage = Message & {
  _id: Types.ObjectId;
};
