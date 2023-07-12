import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { IUser } from '../user.types';

export const CurrentUser = createParamDecorator(
  (data: keyof IUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
