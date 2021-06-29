import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    })
  }

  async register(){
    await this.userService.registerWithFirebase(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.confirmpassword.value);
    this.router.navigate(['/admin/products'])
  }
}
