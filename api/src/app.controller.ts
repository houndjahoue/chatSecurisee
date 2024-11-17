import { Controller, Get, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { EncryptionService } from './encryption/encryption.service';
import { initPushEventSubscription } from '@asaje/sse-push-event-server';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private encryption: EncryptionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('events')
  connectSse(@Res() res: Response) {
    const { value, destroy } = initPushEventSubscription();
    res.on('close', () => {
      destroy();
    });

    return value;
  }

  @Get('test-encryption')
  async testEncryption() {
    const result = await this.encryption.generateKeys();
    return result;
  }
}
