import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adminpost',
  templateUrl: './adminpost.page.html',
  styleUrls: ['./adminpost.page.scss'],
})
export class AdminpostPage implements OnInit {

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
			this.comment=val.comment
		})
		this.sub = this.postReference.valueChanges().subscribe(event => {
			this.comment=event.comment
		})
		this.mainuser= this.afs.doc(`users/dNKjPK5B7VeYTD4AmMgVOWygdwi1`)
		this.sub= this.mainuser.valueChanges().subscribe(event =>{
			this.posts=event.posts.reverse()
			this.title=event.title
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
	async deletePost()
	{
		this.afs.doc(`posts/${this.postID}`).delete()
		this.mainuser.update({
			posts: firestore.FieldValue.arrayRemove(this.postID) 
		})
		this.mainuser.update({
			title: firestore.FieldValue.arrayRemove(this.title) 
		})
		const alert= await this.alertController.create({
			header: 'Bitti',
			message: 'Gönderiniz başarıyla silindi!',
			buttons: ['OK!']
		  })
		  await alert.present()

		  this.router.navigate(['admintabs/feed'])
		
	}

}
