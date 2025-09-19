import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const MODULE = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, TranslateModule]
const COMPONENTS = []

@NgModule({
  declarations: [],
  imports: [...MODULE],
  exports: [...MODULE]
})
export class SharedModule { }
