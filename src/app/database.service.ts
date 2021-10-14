import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private SERVER = 'http://127.0.0.1:8000/api/viewAllRecords';
  constructor(private httpClient: HttpClient) {}

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
}
