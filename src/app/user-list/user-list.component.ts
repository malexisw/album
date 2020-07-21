import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import {Subscription} from "rxjs";
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  usersSubscription: Subscription;
  keyUser: string[];
  pp: any;
  tabpp: string[] = [];
  isConf: boolean[] = [];
 

  constructor(private router: Router,
              private userService: UserService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.usersSubject.subscribe(
      (users: User[]) => {
        const obj = users;
        this.users = Object.values(obj);
        this.keyUser = Object.keys(obj);
        for(let i = 0; i<this.keyUser.length; i++)
        {
          this.onViewPP(i);
          this.isConf[i] = this.users[i].confidentialité;
        }
      }
    );
    
    this.userService.getUsers();
    this.userService.emitUsers();
  }
  
  onViewUser(id: number) {
    const key = this.keyUser[id];
    this.router.navigate(['/users/', key]);
  }

  onViewPP(id: number) {
    const key = this.keyUser[id];
    this.imageService.getPPUser(key).subscribe((pp)=>{
      this.pp;
      const mapped = pp.payload.data();
      this.pp = Object.values(mapped);
      this.tabpp.push(this.pp);
    });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
