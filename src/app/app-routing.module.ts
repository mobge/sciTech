import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthService]},
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
  { path: 'admintabs', loadChildren: './admintabs/admintabs.module#AdmintabsPageModule', canActivate: [AuthService]},
  { path: 'adminpost', loadChildren: './adminpost/adminpost.module#AdminpostPageModule' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
