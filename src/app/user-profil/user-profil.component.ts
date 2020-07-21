import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ImageService } from '../services/image.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  user: User;
  isEdit: boolean = false;
  isViewImg: boolean = false;
  img: any;
  message: string = null;
  isConf: boolean;

  editForm: FormGroup;
  ppForm: FormGroup;

  image: any = null;


  posts: any[];
  pp: any;
  loading: boolean = false;
  


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.user = new User('','','','','',null);
    const id = firebase.auth().currentUser.uid;
    this.userService.getProfile(id).then(
      (user: User) => {
        this.user = user;
        this.isConf = this.user.confidentialité;
      }
    );
    
    this.initForm();

    this.getPosts();
    this.getPP();
    
  }

  editProfil() {
    this.isEdit = !this.isEdit;
  }

  initForm() {
    this.editForm = this.formBuilder.group( {
      description: []
    });
    this.ppForm = this.formBuilder.group( {
      imgProfil: [] 
    });
  }

  handleInput($event: Event){
    this.image = $event.target["files"];
    this.message = (<HTMLInputElement>event.target).files[0].name;
  }

  addPP(data: FormData) {
    this.imageService.createImgProfil(data, this.image)
  }

  getPP(){
    this.imageService.getPP().subscribe((pp)=>{
      this.pp;
      const mapped = pp.payload.data();
      this.pp = Object.values(mapped);
    });
  }

  getPosts(){
    this.imageService.getPosts().subscribe((posts)=>{
      this.posts = [];
      posts.map(post => {
        this.posts.push({
          id: post.payload.doc.id,
          data: post.payload.doc.data()
        })
        console.log(this.posts)
      })
    })
  }

  deletePost(id: string, image: string){
    console.log(image)
    console.log(id)
    this.imageService.deletePosts(id, image);
  }

  viewImg(i: string) {
    this.isViewImg = !this.isViewImg;
    this.img = i;
  }

  onSubmit(data: FormData) {
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).update(data);
    this.editProfil();
  }

  changeConf(){
    this.user.confidentialité = !this.user.confidentialité;
    this.isConf = this.user.confidentialité;
    let objC: Object = {confidentialité: this.isConf };
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).update(objC);
  }

}
