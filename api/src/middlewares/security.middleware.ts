import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { $t } from 'src/i18n';
import { I18nService } from 'src/i18n/i18n.service';
import { UserSession } from 'src/users/users.sessions';
import { Session } from 'src/users/users.typings';

export type UserRequest = Request & {
  session?: Session;
};

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(
    private session: UserSession,
    private i18n: I18nService,
  ) {}

  setUserLocale(req: UserRequest) {
    const locale = (req?.headers['x-user-locale'] as string) ?? 'fr';

    this.i18n.setCurrentLocale(locale);
  }

  extractToken(req: UserRequest) {
    const token = req?.headers?.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException($t('MISSING_SECURITY_HEADERS'));
    }

    return token;
  }

  use(req: UserRequest, _: Response, next: NextFunction) {
    this.setUserLocale(req);
    const token = this.extractToken(req);

    const session = this.session.find(token);
    if (!session) {
      throw new UnauthorizedException($t('BAD_IDENTITY'));
    }
    req.session = session;

    return next();
  }
}
