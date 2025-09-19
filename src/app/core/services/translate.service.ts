import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private supportedLangs = ['es', 'en'];

  constructor(private translate: NgxTranslateService) {
    this.initLanguage();
  }

  private initLanguage() {
    const savedLang = localStorage.getItem('app_lang');

    if (savedLang && this.supportedLangs.includes(savedLang)) {
      this.use(savedLang);
      return;
    }

    const browserLang = this.translate.getBrowserLang();

    if (browserLang && this.supportedLangs.includes(browserLang)) {
      this.use(browserLang);
    } else {
      this.use('en'); 
    }
  }

  use(lang: string) {
    if (!this.supportedLangs.includes(lang)) {
      lang = 'en';
    }
    this.translate.use(lang);
    localStorage.setItem('app_lang', lang);
  }

  instant(key: string, params?: any) {
    return this.translate.instant(key, params);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}
