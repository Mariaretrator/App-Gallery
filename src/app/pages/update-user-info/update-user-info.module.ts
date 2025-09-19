import { NgModule } from '@angular/core';
import { UpdateUserInfoPageRoutingModule } from './update-user-info-routing.module';
import { UpdateUserInfoPage } from './update-user-info.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    UpdateUserInfoPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateUserInfoPage]
})
export class UpdateUserInfoPageModule {}
