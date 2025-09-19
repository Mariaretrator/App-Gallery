import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthLinksComponent } from './components/auth-links/auth-links.component';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';

const MODULE = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, TranslateModule]
const COMPONENTS = [AuthLinksComponent , LanguageSwitchComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULE],
  exports: [...MODULE , ...COMPONENTS]
})
export class SharedModule { }
