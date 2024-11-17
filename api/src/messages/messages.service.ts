import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IncomingMessageDto } from './messages.dto';
import { sendPushEvent } from '@asaje/sse-push-event-server';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async handleIncoming(data: IncomingMessageDto) {
    const result = await this.prisma.message.create({ data });
    sendPushEvent({ event: 'new-message', data: {} });
    return result;
  }
}
