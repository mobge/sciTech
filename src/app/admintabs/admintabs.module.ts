import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmintabsPage } from './admintabs.page';
import { AdmintabsRoutingModule } from './admintabs.router.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	IonicModule,
	AdmintabsRoutingModule
  ],
  declarations: [AdmintabsPage]
})
export class AdmintabsPageModule {}
