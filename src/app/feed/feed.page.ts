import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';

@Component({
 selector: 'app-feed',
 templateUrl: './feed.page.html',
 styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

 mainuser: AngularFirestoreDocument
 sub
 posts
 postReference: AngularFirestoreDocument

 constructor(private afs: AngularFirestore, private user: UserService, private router: Router, private route: ActivatedRoute) {
     this.mainuser= afs.doc(`users/q5Hvs00OV0fUL3izFvRKhk6gR3D2`)
     this.sub= this.mainuser.valueChanges().subscribe(event =>{
       this.posts=event.posts.reverse()
     })
  }

  ngOnDestory(){
     this.sub.unscribe()
  }

  goTo(postID: string) {
    this.router.navigate(['/tabs/post/'+ postID])
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

