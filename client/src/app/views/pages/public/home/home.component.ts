import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  validationForm: FormGroup;
  formData: any;
  start: any;
  end: any;

  constructor(public formBuilder: FormBuilder) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 0);
    this.maxDate = new Date(currentYear + 1, 0, 0);

    this.validationForm = this.formBuilder.group({
      destination : ['', Validators.required],
      type : ['', [Validators.required]],
      personnes : ['', Validators.required],
      start: [[Validators.required]],
      end: [[Validators.required]],
    });
  }

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  selectedStates: string[];


  ngOnInit(): void {
  }

  formSubmit() {
    if (this.validationForm.valid) {
      this.formData =  new FormData();

      this.start = moment(this.validationForm.get('start').value).format('YYYY-MM-DD');
      this.end = moment(this.validationForm.get('end').value).format('YYYY-MM-DD');

      this.formData.append('start', this.start);
      this.formData.append('end', this.end);
      this.formData.append('destination', this.validationForm.get('destination').value);
      this.formData.append('type', this.validationForm.get('type').value);
      this.formData.append('personnes', this.validationForm.get('personnes').value);

      console.log(this.validationForm.value);
      // Display the values
      for (const value of this.formData.values()) {
        console.log(value);
      }
    }
  }}

