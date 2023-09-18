import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  showSpinner() {
    this.spinner.show();
    // Perform your asynchronous task here
    setTimeout(() => {
      // this.spinner.hide();
    }, 3000); // Simulating a task completion after 3 seconds
  }

  ngOnInit() {}
  async loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
