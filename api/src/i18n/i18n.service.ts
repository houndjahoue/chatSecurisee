import { Injectable } from '@nestjs/common';
import { en } from './en';
import { fr } from './fr';

@Injectable()
export class I18nService {
  static dictionnary = { en, fr };
  static locale = 'en';

  setCurrentLocale(locale: string) {
    I18nService.locale = locale;
  }

  static translate(key: keyof typeof fr) {
    return (I18nService.dictionnary[I18nService.locale][key] as string) ?? '';
  }
}
