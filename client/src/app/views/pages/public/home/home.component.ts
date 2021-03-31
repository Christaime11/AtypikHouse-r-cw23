import {Component, Injectable, OnInit} from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateStruct,
  NgbDatepickerConfig,
  NgbDateParserFormatter,
  NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        year : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        day : parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        year : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        day : parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }


}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter},
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})


export class HomeComponent implements OnInit {

  selectedDate: NgbDateStruct;
  selectedDate2: NgbDateStruct;
  minDate = undefined;
  model2: string;

  hoveredDate: NgbDate | null = null;
  public formatter2: CustomAdapter;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  validationForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private config: NgbDatepickerConfig,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter,
              private dateAdapter: NgbDateAdapter<string>,
              private ngbCalendar: NgbCalendar
              )
  {
     // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    // @ts-ignore
    config.maxDate = {
      year: current.getFullYear() + 1,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    config.outsideDays = 'hidden';

    this.validationForm = this.formBuilder.group({
      destination : ['', Validators.required],
      type : ['', [Validators.required]],
      personnes : ['', Validators.required],
      fromdate : [null, Validators.required],
      todate : [null, Validators.required],
    });

  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  today() {
    // tslint:disable-next-line:no-non-null-assertion
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.validationForm.value)
  }
}
