import { Injectable } from '@nestjs/common';
import { Session } from './users.typings';
import { User } from '@prisma/client';
import { nanoid } from 'nanoid';

@Injectable()
export class UserSession {
  static connectedUsers: Session[] = [];

  find(token: string) {
    return UserSession.connectedUsers.find((u) => u.token === token);
  }

  registerUser(user: Partial<User>) {
    const token = nanoid(64);
    UserSession.connectedUsers.push({ token, user });
    return token;
  }

  removeUser(token: string) {
    UserSession.connectedUsers = UserSession.connectedUsers.filter(
      (u) => u.token !== token,
    );
  }
}
