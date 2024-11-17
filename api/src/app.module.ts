import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SecurityMiddleware } from './middlewares/security.middleware';
import { I18nModule } from './i18n/i18n.module';
import { EmailModule } from './email/email.module';
import { OtpModule } from './otp/otp.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    I18nModule,
    EmailModule,
    OtpModule,
    ConversationsModule,
    MessagesModule,
    EncryptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .exclude(
        { path: '/users/signin', method: RequestMethod.POST },
        { path: '/users/signup', method: RequestMethod.POST },
        { path: '/users/forgot-password', method: RequestMethod.POST },
        { path: '/users/verify-otp', method: RequestMethod.POST },
        { path: '/users/update-password', method: RequestMethod.POST },
        { path: '/test-(.*)', method: RequestMethod.ALL },
        { path: '/events', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
