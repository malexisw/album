import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-storage',
  templateUrl: './user-storage.component.html',
  styleUrls: ['./user-storage.component.scss']
})
export class UserStorageComponent implements OnInit {

  constructor(private imageService: ImageService,
              private router: Router) { }

  image: any = null;

  message: string = null;

  percentagePost: Observable<number>;

  postsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    cover: new FormControl('', Validators.required)
  })

  handleInput($event: Event){
    this.image = $event.target["files"];
    this.message = (<HTMLInputElement>event.target).files[0].name;
  }

  addPost(data: FormData) {
    this.imageService.createPost(data, this.image);
    this.percentagePost = this.imageService.getPercentagePost();
  }

  onBack() {
    this.router.navigate(['/profil']);
  }

  ngOnInit(){
      
  }

}
