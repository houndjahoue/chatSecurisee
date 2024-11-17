import { Injectable, Logger } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  static transporter: Transporter<SMTPTransport.SentMessageInfo> | null;
  private logger = new Logger(EmailService.name);

  constructor() {
    this.init();
  }

  init() {
    if (!EmailService.transporter) {
      EmailService.transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
    return EmailService.transporter;
  }

  async send(data: Mail.Options) {
    try {
      await EmailService.transporter.sendMail({
        ...data,
        from: process.env.EMAIL_FROM,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
