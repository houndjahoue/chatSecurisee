import { ApiProperty } from '@nestjs/swagger';

export class IncomingMessageDto {
  @ApiProperty()
  senderId: string;

  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  conversationId: string;

  @ApiProperty()
  content: string;
}
