import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  modalContent!: BsModalRef;
  
  constructor(public userService: UserService, 
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  logOut(){
    this.modalContent = this.modalService.show(ConfirmComponent);
  }
}
