import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { AdmintabsPage } from './admintabs.page';

const routes: Routes = [
	{
		path: '',
		component: AdmintabsPage,
		children: [
			{ path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
			{ path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule', },
			{ path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
			{ path: 'adminpost/:id', loadChildren: '../adminpost/adminpost.module#AdminpostPageModule' },
			{ path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' },
			{ path: 'favorite', loadChildren: '../favorite/favorite.module#FavoritePageModule' },
		]
	}	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdmintabsRoutingModule { }
  