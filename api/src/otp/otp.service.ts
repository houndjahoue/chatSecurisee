import { $t } from 'src/i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { EmailService } from 'src/email/email.service';
import { setupOtpEmail } from './otp.constants';
import { User } from '@prisma/client';
import { setupOtp2Email } from './otp2.constants';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private email: EmailService,
  ) {}

  async generate(userId: string) {
    const value = customAlphabet('0123456789')(6);
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
    const otp = await this.prisma.otp.create({
      data: { userId, expiredAt, value },
    });
    return otp;
  }

  async sendOtpByEmail(user: Partial<User>) {
    const otp = await this.generate(user.id);
    this.email.send({
      to: user.email,
      html: setupOtpEmail({ username: user.username, otp: otp.value }),
    });
  }

  async sendOtp2ByEmail(user: Partial<User>) {
    const otp = await this.generate(user.id);
    this.email.send({
      to: user.email,
      html: setupOtp2Email({ username: user.username, otp: otp.value }),
    });
  }

  async verifyOtp(userId: string, value: string) {
    const otp = await this.prisma.otp.findFirst({ where: { userId, value } });

    if (!otp) {
      throw new UnprocessableEntityException($t('INCORRECT_OTP'));
    }

    if (otp.expiredAt.getTime() < Date.now() || otp.used) {
      await this.prisma.otp.update({
        where: { id: otp.id },
        data: { expired: true },
      });
      throw new UnprocessableEntityException($t('EXPIRED_OTP'));
    }

    await this.prisma.otp.update({
      where: { id: otp.id },
      data: { used: true },
    });
  }
}
