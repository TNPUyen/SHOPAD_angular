import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // image:string = 'assets/undraw_profile.svg';
  modalContent!: BsModalRef;

  constructor(public userService: UserService, private modalService: BsModalService) { 

  }

  ngOnInit(): void {
  }

  logOut(){
    this.modalContent = this.modalService.show(ConfirmComponent);
  }
}
