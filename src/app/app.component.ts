import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularForms';

  personalForm: FormGroup;

  stateList;

  cityList;

  passModel = "";

  conPassModel = "";

  passValid;

  pValid;

  constructor() {
    this.personalForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phno: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      conPass: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      marital: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });

    this.personalForm.get('country').valueChanges.subscribe((data) => {
      this.stateList = Object.keys(this.countryData[data]);
    });

    this.personalForm.get('state').valueChanges.subscribe((data) => {
      this.cityList = this.countryData[this.personalForm.value.country][data];
    });
    
    this.personalForm.get('phno').valueChanges.subscribe((data) => {
      this.pValid = (/^\d+$/.test(data) && data.length >= 9);
    });

    this.personalForm.get('pass').valueChanges.subscribe((data) => {
      if(this.personalForm.value.conPass === data){
        this.passValid = true;
      }
      else{
        this.passValid = false;
      }
    });

    this.personalForm.get('conPass').valueChanges.subscribe((data) => {
      if(this.personalForm.value.pass === data){
        this.passValid = true;
      }
      else{
        this.passValid = false;
      }
    });

  }

  submitData() {
    console.log(this.personalForm.valid);
  }

  countryData = {
    "India": {
      "Tamil Nadu": ["Chennai", "Madurai"],
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"]
    },
    "America": {
      "New York": ["New York", "Manhattan"],
      "California": ["Los Angeles", "San Francisco"]
    }
  }

  countryList = Object.keys(this.countryData);



  print() {
    console.log(this.personalForm.value.country);
  }

  onSubmit(){
    console.log(this.personalForm.value);
  }

}
