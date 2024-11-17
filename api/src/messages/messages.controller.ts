import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IncomingMessageDto } from './messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() data: IncomingMessageDto) {
    return this.messagesService.handleIncoming(data);
  }
}
