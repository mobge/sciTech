import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { Observable, observable } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
 selector: 'app-feed',
 templateUrl: './feed.page.html',
 styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

 mainuser
 sub
 posts
 title
 postss

 constructor(private afs: AngularFirestore, private user: UserService, private router: Router, private route: ActivatedRoute) {
     this.mainuser= afs.doc(`users/dNKjPK5B7VeYTD4AmMgVOWygdwi1`)
     this.sub= this.mainuser.valueChanges().subscribe(event =>{
     this.posts=event.posts.reverse()
     this.title=event.title
     })
      
  }
  
  ngOnDestory(){
     this.sub.unscribe()
  }

  goTo(postID: string) {
    if (this.user.getUsername()=="admin") {
      this.router.navigate(['/admintabs/adminpost/'+ postID])
    }
    else {
      this.router.navigate(['/tabs/post/'+ postID])
    } 
  }
  async reverse(posts)
  {
    for(let i=posts.length;i=0;i--)
    {
      this.posts=posts;
    }
  }

 ngOnInit() {
}
}
