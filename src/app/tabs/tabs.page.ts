import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
	username: string = ""

	@ViewChild('tabs') tabs: IonTabs

	constructor() { }
	
	ngOnInit() {
		this.tabs.select('feed')
	}

}
