import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public modalContent!: BsModalRef;

  constructor(public userService: UserService, 
              private router: Router,
              public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(){
    this.userService.logout();
    this.bsModalRef.hide();
    this.router.navigate(['']);
  }

  cancel(){
    this.bsModalRef.hide();
  }

}
