import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseService } from '../database.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bbank',
  templateUrl: './bbank.component.html',
  styleUrls: ['./bbank.component.css'],
})
export class BBankComponent implements OnInit {
  editableObject = {
    id: -1,
    name: '',
    city: '',
    bloodGroup: '',
    contact: '',
    email: '',
  };
  addNew = true;
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

  constructor(
    public databaseService: DatabaseService,
    private toastr: ToastrService
  ) {}

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
  signOut() {
    console.log('In sign out Function');
    alert('Are you sure, that you want to Log Out?');
    this.databaseService.signOut2().subscribe((response) => {
      this.databaseService.loggedIn = !response;
      console.log(!response);
    });
  }
  editRecord(record: any) {
    this.addNew = false;
    this.editableObject = record;
    console.log('The index of the record to edit is :', this.editableObject);
  }

  updateExisting() {
    console.log('New record to add:', this.editableObject);
    let toChange = this.editableObject;
    this.editableObject = {
      id: -1,
      name: '',
      city: '',
      bloodGroup: '',
      contact: '',
      email: '',
    };
    this.databaseService
      .editRecord(toChange)
      .subscribe((response) =>
        console.log('The response returned from the Backend', response)
      );
    this.addNew = true;
  }

  deleteProfile(id: number) {
    if (!confirm('Are you sure you want to del this item?')) return;
    this.databaseService.delete(id).subscribe((res) => {
      console.log(res);
      this.databaseService.getAllRecords().subscribe((data: any) => {
        console.log(data);
        this.currentRecord = data;
      });
    });
    this.toastr.success('User Record Deleted Successfully !');
  }

  sendEmail(email: any) {
    this.databaseService
      .sendmail(email)
      .subscribe((response) => console.log(response.body));
  }
}
