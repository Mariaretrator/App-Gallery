import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(private translate: NgxTranslateService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  use(lang: string) {
    this.translate.use(lang);
  }

  instant(key: string, params?: any) {
    return this.translate.instant(key, params);
  }
}