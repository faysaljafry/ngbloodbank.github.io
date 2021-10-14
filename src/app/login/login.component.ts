import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private database: DatabaseService) {}
  loggedIn: any;
  ngOnInit(): void {}

  signIn(form: NgForm) {
    console.log('Ready To Go for a Sign In check Up');
    this.database.signIn(form.value).subscribe((response) => {
      console.log(response);
      this.loggedIn = response.body;
      if (!this.loggedIn)
        form.form.controls['userEmail'].setErrors({ invalid: true });
    });
    // if (!this.loggedIn) {
    //   console.log(this.loggedIn);
    //   form.form.controls['userEmail'].setErrors({ invalid: true });
    // }
    //console.log(!this.loggedIn);
  }
}
