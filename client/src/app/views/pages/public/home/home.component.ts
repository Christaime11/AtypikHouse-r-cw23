import {Component, OnInit} from '@angular/core';
import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Bank, BANKS } from './demo-data';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM-YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})



export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  date = new FormControl(moment());

  validationForm: FormGroup;
  formData: any;
  start: any;
  end: any;

  personnes: number[] = [
    1,2,3,4,5,6,7,8,9,10
    ];

  selectedStates: string[];


  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  minDate: Date;
  maxDate: Date;


  constructor(public formBuilder: FormBuilder) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.validationForm = this.formBuilder.group({
      destination : ['', Validators.required],
      type : ['', [Validators.required]],
      personnes : ['', Validators.required],
      start: [[Validators.required]],
      end: [[Validators.required]],
    });
  }

  /*ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }*/


  ngOnInit(): void {
    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }


  // tslint:disable-next-line:adjacent-overload-signatures
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  formSubmit() {
    if (this.validationForm.valid) {
      this.formData =  new FormData();

      this.start = moment(this.validationForm.get('start').value).format('YYYY-MM-DD');
      this.end = moment(this.validationForm.get('end').value).format('YYYY-MM-DD');

      this.formData.append('start', this.start);
      this.formData.append('end', this.end);
      this.formData.append('destination', this.validationForm.get('destination').value);
      this.formData.append('type', this.validationForm.get('type').value.name);
      this.formData.append('personnes', this.validationForm.get('personnes').value);

      console.log(this.validationForm.value);
      // Display the values
      for (const value of this.formData.values()) {
        console.log(value);
      }
    }
  }

  ngAfterViewInit(): void {
  }
}

