import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { post } from 'selenium-webdriver/http';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

	postID: string
	effect: string = ''
	post
	postReference: AngularFirestoreDocument
	sub
	heartType: string = "heart-empty"
	

	mainuser
	posts
	title
	postss=[]
	constructor(
		private route: ActivatedRoute, 
		private afs: AngularFirestore,
		private user: UserService,
		private router: Router,
		public afstore: AngularFirestore) {
		
	}

	ngOnInit() {
		this.postID = this.route.snapshot.paramMap.get('id')
		this.postReference = this.afs.doc(`posts/${this.postID}`)
		this.sub = this.postReference.valueChanges().subscribe(val => {
			this.post = val
			this.effect = val.effect
			this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
		})
		
		this.mainuser= this.afs.doc(`users/dNKjPK5B7VeYTD4AmMgVOWygdwi1`)
		this.sub= this.mainuser.valueChanges().subscribe(event =>{
			this.posts=event.posts.reverse()
			this.title=event.title
			this.postss=this.posts
		})
		
				
	}
	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	toggleHeart() {

		if(this.heartType == 'heart-empty') {
			this.postReference.update({
			likes: firestore.FieldValue.arrayUnion(this.user.getUID())
			})
			this.afstore.doc(`favorite/${this.user.getUID()}`).update({
				posts: firestore.FieldValue.arrayUnion(this.postID)
			})
		} else {
			this.postReference.update({
				likes: firestore.FieldValue.arrayRemove(this.user.getUID())
			})
			this.afstore.doc(`favorite/${this.user.getUID()}`).update({
				posts: firestore.FieldValue.arrayRemove(this.postID) 
			})
		}
	}

}
