import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signForm: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { 
  }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signInWithEmail(){
    if(this.signForm.invalid){
      return;
    }
    this.userService.loginWithEmail(this.signForm.controls.email.value, this.signForm.controls.password.value).then(
      res => this.router.navigate(['/admin/products'])
    ).catch(err => alert(err.message));
  }

  async signInWithGG(){
    await this.userService.login();
    this.router.navigate(['/admin/products'])
  }
}
