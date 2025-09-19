import { Component } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
  standalone: false
})
export class LanguageSwitchComponent {
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.getCurrentLang();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
