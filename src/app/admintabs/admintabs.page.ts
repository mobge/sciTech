import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-admintabs',
  templateUrl: './admintabs.page.html',
  styleUrls: ['./admintabs.page.scss'],
})
export class AdmintabsPage implements OnInit {

  @ViewChild('tabs') tabs: IonTabs
  constructor() { }

  ngOnInit() {
    this.tabs.select('feed')
  }

}
