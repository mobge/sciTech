import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""

	constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router, public afstore: AngularFirestore) { }

	ngOnInit() {
	}

	async login() {
		const { username, password } = this
		try { 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				if(username=="admin")
				{
				 	this.router.navigate(['/admintabs/feed'])
				}
				else
				{
					this.router.navigate(['/tabs/feed'])
				}

			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("Kullanıcı Bulunamadı")
			}
		}
	}
	async register() {
		this.router.navigate(['/register'])
	}

}
