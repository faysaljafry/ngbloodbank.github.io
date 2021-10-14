import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public database: DatabaseService, private router: Router) {}

  ngOnInit(): void {}

  signIn(form: NgForm) {
    console.log('Ready To Go for a Sign In check Up');
    this.database.signIn(form.value).subscribe((response) => {
      console.log(response);
      this.database.loggedIn = response.body;

      if (this.database.loggedIn) {
        //form.form.controls['userEmail'].setErrors({ invalid: true });
        this.router.navigate(['']);
      }
    });
    // if (!this.loggedIn) {
    //   console.log(this.loggedIn);
    //   form.form.controls['userEmail'].setErrors({ invalid: true });
    // }
    //console.log(!this.loggedIn);
  }
  // public logOut() {
  //   this.database.signOut().subscribe((response) => {
  //     this.database.loggedIn = response;
  //   });
  // }
}
