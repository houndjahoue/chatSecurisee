import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Session } from 'src/users/users.typings';

class SearchParams {
  @ApiPropertyOptional()
  search?: string;
}

@Controller('conversations')
@ApiTags('Conversations')
@ApiBearerAuth()
export class ConversationsController {
  constructor(private service: ConversationsService) {}

  @Get()
  async all(
    @Query() { search }: SearchParams,
    @CurrentUser() { user }: Session,
  ) {
    return await this.service.findAllByUserId(user.id, search);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    const result = await this.service.findOne(id);
    return result;
  }


}
