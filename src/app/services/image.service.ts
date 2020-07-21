import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UserProfilComponent } from '../user-profil/user-profil.component';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private router: Router) { }

  downloadURL: Observable<string>;
  percentagePost: Observable<number>;
  percentagePP: Observable<number>;

  getPosts(){
    return this.firestore.collection(firebase.auth().currentUser.uid).snapshotChanges();
  }

  getPostsUser(id: string){
    return this.firestore.collection(id).snapshotChanges();
  }

  deletePosts(docID: string, image: string){
    const storageRef = this.storage.storage.ref();
    storageRef.child(image).delete()
    .then(()=>{
      console.log("image delete")
    }).catch(err => {
      console.log(err)
    });
    this.firestore.collection(firebase.auth().currentUser.uid).doc(docID)
    .delete().then(()=>{
      console.log("post deleted")
    }).catch(err => {
      console.log(err)
    })
  }

  getPercentagePost() {
    return this.percentagePost;
  }

  createPost(postData: FormData, file: any[]){
    const image = file[0];
    const filepath = firebase.auth().currentUser.uid + "/"  + Date.now() + file[0]["name"];
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, image);
    this.percentagePost = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        console.log("File is being processed, you will be redirected soon...");
        fileRef.getDownloadURL().subscribe(url=>{
          this.downloadURL = url;
          

          let newpost = {
            title: postData["title"],
            content: postData["content"],
            cover: this.downloadURL,
            fileref: filepath
          }

          this.firestore.collection(firebase.auth().currentUser.uid).add(newpost)
          .then(post=>{
            this.router.navigate(['/profil'])
          }).catch(err=>{
            console.log("error: ", err);
          });
        })
      })
    ).subscribe()
  }

  getPercentagePP() {
    return this.percentagePP;
  }


  createImgProfil(imgData: FormData, file: any[]) {
    const image = file[0];
    const filepath = firebase.auth().currentUser.uid + "/profil/" + Date.now()  + file[0]["name"];
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, image);
    this.percentagePP = task.percentageChanges();

    task.snapshotChanges().pipe(   
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url=>{
          this.downloadURL = url;

          let newpp = {
            cover: this.downloadURL,
          }

          this.firestore.collection(firebase.auth().currentUser.uid).doc("profil").set(newpp)
        })
      })
    ).subscribe()
  }

  getPP(){
    const profilRef = this.firestore.collection(firebase.auth().currentUser.uid);
    return profilRef.doc("/profil").snapshotChanges();
  }

  getPPUser(id: string){
    const profilRef = this.firestore.collection(id);
    return profilRef.doc("/profil").snapshotChanges();
  }
}
