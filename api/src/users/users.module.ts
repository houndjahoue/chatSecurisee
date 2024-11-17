import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserSession } from './users.sessions';
import { OtpModule } from 'src/otp/otp.module';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [PrismaModule, OtpModule, ConversationsModule, EncryptionModule],
  providers: [UsersService, UserSession],
  controllers: [UsersController],
  exports: [UsersService, UserSession],
})
export class UsersModule {}
