import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';

@Component({
 selector: 'app-favorite',
 templateUrl: './favorite.page.html',
 styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

 mainuser: AngularFirestoreDocument
 sub
 posts
 postReference: AngularFirestoreDocument

 constructor(private afs: AngularFirestore, private user: UserService, private router: Router, private route: ActivatedRoute) {
     this.mainuser=afs.doc(`favorite/${this.user.getUID()}`)
     this.sub= this.mainuser.valueChanges().subscribe(event =>{
       this.posts=event.posts.reverse()
       
     })
  }

  ngOnDestory(){
     this.sub.unscribe()
  }

  goTo(postID: string) {
    if (this.user.getUsername()=="admin") {
      this.router.navigate(['/admintabs/post/'+ postID])
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



