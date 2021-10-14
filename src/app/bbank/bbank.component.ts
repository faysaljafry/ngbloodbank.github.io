import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-bbank',
  templateUrl: './bbank.component.html',
  styleUrls: ['./bbank.component.css'],
})
export class BBankComponent implements OnInit {
  isLoggedIn = true;
  EmailOccupied!: any;
  errorFlag = false;
  index: number = 0;
  currentRecord: any = [{}];
  // Blood group Options
  public options: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  selected = 'A+';
  selectedQuantity = '10';
  ProfileData: any = {};

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getAllRecords().subscribe((data: any) => {
      console.log(data);
      this.currentRecord = data;
    });
  }

  addData(form: NgForm) {
    console.log(form);
    const profile = form.value;
    //Checking for already entered Email
    var found = false;
    for (var i = 0; i < this.currentRecord.length; i++) {
      if (this.currentRecord[i].contact == form.value.contact) found = true;
    }
    console.log(form.value);
    this.databaseService
      .addRecord(form.value)
      .pipe(
        catchError((Problem: HttpErrorResponse) => {
          this.EmailOccupied = Problem.error;
          alert(Problem.error.title);
          form.form.controls['email'].setErrors({ invalid: true });
          console.log(Problem.error);
          return of();
        })
      )
      .subscribe(() => {
        this.currentRecord.push(form.value);
        this.EmailOccupied = {};
      });
  }
}
