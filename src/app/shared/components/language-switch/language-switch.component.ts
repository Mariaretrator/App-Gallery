import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';


@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
  standalone: false
})
export class LanguageSwitchComponent implements OnInit {
  currentLang!: string;
  langs: string[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLang = this.translateService.getCurrentLang();
    this.langs = this.translateService.getAvailableLangs();
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    this.currentLang = lang;
  }
}
