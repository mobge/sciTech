import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth, firestore } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router
		) { }

	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}
	async sameUser()
	{
	const alert= await this.alertController.create({
		header: 'Başarısız',
		message: 'Kullanıcı adı mevcut.',
		buttons: ['OK']
	});
	await alert.present();
	}
	async matchPassword()
	{
	const alert= await this.alertController.create({
		header: 'Başarısız',
		message: 'Şifreniz eşleşmiyor.',
		buttons: ['OK']
		});
		await alert.present();	
	}

	async register() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
			this.matchPassword()
			return console.error("Şifreler Eşleşmiyor!")
			
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password)

			this.afstore.doc(`users/${res.user.uid}`).set({
				username
			})

			this.user.setUser({
				username,
				uid: res.user.uid
			})

			this.presentAlert('Başarılı', 'Kayıt Oldunuz!')
			this.router.navigate(['/login'])

		} catch(error) {
			console.dir(error)
			this.matchPassword()
		}
		this.afstore.doc(`favorite/${this.user.getUID()}`).set({
			posts: [],
			username,
		})
		
	}

}
