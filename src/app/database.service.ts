import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, ObservableInput, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private SERVER = 'http://127.0.0.1:8000/api/viewAllRecords';
  constructor(private httpClient: HttpClient) {}
  loggedIn: any;
  loggedOut: any = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'response',
  };
  public getAllRecords() {
    return this.httpClient.get(this.SERVER);
  }
  public addRecord(data: any) {
    return this.httpClient.post(
      'http://127.0.0.1:8000/api/addProfile',
      data,
      this.httpOptions
    );
  }
  public signIn(data: any) {
    let toSend = {
      email: data.userEmail,
      password: data.password,
    };
    return this.httpClient.post(
      'http://127.0.0.1:8000/api/login',
      toSend,
      this.httpOptions
    );
  }

  public signOut() {
    this.signOut2().subscribe((response) => {
      this.loggedOut = response;
    });
  }
  public signOut2() {
    let response = this.httpClient
      .get<boolean>('http://127.0.0.1:8000/api/logout')
      .pipe(catchError(this.httpError));

    if (this.loggedOut) {
      console.log('Logged Out!');
    }
    return response;
  }
  httpError(error: any) {
    return throwError(error);
  }
}
