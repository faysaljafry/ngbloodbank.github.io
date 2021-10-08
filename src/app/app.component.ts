import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Get Existing data from local Storage
  dataBase: any = localStorage.getItem('Records');
  parsed: any = JSON.parse(this.dataBase);
  index: number = 0;
  currentRecord: any = this.parsed;
  // Blood group Options
  public options: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  selected = 'A+';
  selectedQuantity = '10';
  ProfileData: any = {};
  addData(form: NgForm) {
    this.ProfileData = form.value;
    var found = false;
    for (var i = 0; i < this.currentRecord.length; i++) {
      if (this.currentRecord[i].contact == form.value.contact) found = true;
    }
    if (!found) this.currentRecord.push(this.ProfileData);
    localStorage.setItem('Records', JSON.stringify(this.currentRecord));
  }
  title = 'CUBE Blood Bank';
}
