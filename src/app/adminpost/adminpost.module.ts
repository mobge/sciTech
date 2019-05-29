import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminpostPage } from './adminpost.page';
import { ShareModule } from '../share.module';

const routes: Routes = [
  {
    path: '',
    component: AdminpostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [AdminpostPage]
})
export class AdminpostPageModule {}
