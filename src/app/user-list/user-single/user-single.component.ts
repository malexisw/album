import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User.model';
import * as firebase from 'firebase';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {

  user: User;
  pp: any;
  posts: any [];
  id: string =  this.route.snapshot.params['id'];
  isViewImg: boolean = false;
  img: any;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.user = new User('','','','','',false);
    this.userService.getProfile(this.id).then(
      (user: User) => {
        this.user = user;
      }
    );

    this.getPosts();
    this.getPP();
  }

  getPosts(){
    this.imageService.getPostsUser(this.id).subscribe((posts)=>{
      this.posts = [];
      posts.map(post => {
        this.posts.push({
          id: post.payload.doc.id,
          data: post.payload.doc.data()
        })
      })
    })
  }

  getPP(){
    this.imageService.getPPUser(this.id).subscribe((pp)=>{
      this.pp;
      const mapped = pp.payload.data();
      this.pp = Object.values(mapped);
    });
  }

  viewImg(i: string) {
    this.isViewImg = !this.isViewImg;
    this.img = i;
  }

  onBack() {
    this.router.navigate(['/users']);
  }

}
