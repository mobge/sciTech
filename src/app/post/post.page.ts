import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


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
	title:string
	comment:string
	writeComment:[]
	constructor(
		private route: ActivatedRoute, 
		private afs: AngularFirestore,
		private user: UserService,
		private router: Router,
		public afstore: AngularFirestore,
		private alertController: AlertController) {
		
	}

	ngOnInit() {
		this.postID = this.route.snapshot.paramMap.get('id')
		this.postReference = this.afs.doc(`posts/${this.postID}`)
		this.sub = this.postReference.valueChanges().subscribe(val => {
			this.post = val
			this.effect = val.effect
			this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
			this.title=val.title
		})
		this.sub = this.postReference.valueChanges().subscribe(event => {
			this.comment=event.comment
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
	createComment() {
		this.postReference.update({
			comment: firestore.FieldValue.arrayUnion(this.user.getUsername()+": "+this.writeComment)
	})
	this.writeComment=[]
	}
}
