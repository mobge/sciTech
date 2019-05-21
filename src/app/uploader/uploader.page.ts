import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string;
  desc: string
  title: string

  busy: boolean = false;

  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http, 
    public afstore: AngularFirestore, 
    public user: UserService, 
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }
  
  async createPost()
  {
    this.busy=true
    const image=this.imageURL
    const desc=this.desc
    const title=this.title

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(image) 
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      title,
      author: this.user.getUsername(),
      likes: []
    })

    

    this.busy=false
    this.imageURL=""
    this.desc=""
    this.title=""



    const alert= await this.alertController.create({
      header: 'Bitti',
      message: 'Gönderiniz başarıyla oluşturuldu!',
      buttons: ['OK!']
    })

    await alert.present()

    this.router.navigate(['admintabs/feed'])

  }

  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {
    this.busy=true;

    const files=event.target.files;
  
    const data=new FormData()
    data.append('file',files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY','33203dfc97a0f5b0a657')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      this.imageURL=event.json().file
      this.busy=false;
    })
  }
  goAhead()
  {
    this.router.navigate(['/tabs'])
  }
}
