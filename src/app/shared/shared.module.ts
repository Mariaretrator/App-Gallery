import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthLinksComponent } from './components/auth-links/auth-links.component';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';

const MODULE = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, TranslateModule , RouterModule]
const COMPONENTS = [AuthLinksComponent , LanguageSwitchComponent , CardComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULE],
  exports: [...MODULE , ...COMPONENTS]
})
export class SharedModule { }
