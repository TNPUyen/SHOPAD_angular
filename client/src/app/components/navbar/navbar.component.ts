import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  image:string = 'assets/undraw_profile.svg';

  constructor(public userService: UserService) { 

  }

  ngOnInit(): void {
  }


}
