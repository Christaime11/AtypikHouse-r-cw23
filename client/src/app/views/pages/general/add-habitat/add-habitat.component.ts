
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

import { PeoplesData, Person } from '../../../../core/imported-datas/peoples.data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import {HabitatsTypesService} from "../../../../core/habitats/habitats-types.service";


@Component({
  selector: 'app-add-habitat',
  templateUrl: './add-habitat.component.html',
  styleUrls: ['./add-habitat.component.scss'],
})
export class AddHabitatComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  files: string  []  =  [];
  people: Person[] = [];

  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: boolean;
  isForm2Submitted: boolean;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  errors: any;
  success: any;
  display = true;

  data: any;
  types: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private habitatsTypesApi: HabitatsTypesService,
    private router: Router) { }

  onFileChanged(event) {
    console.log(event.target.files);
    // tslint:disable-next-line:prefer-for-of
    for (let i =  0; i <  event.target.files.length; i++)  {
      this.files.push(event.target.files[i]);
    }
    console.log(this.files);
  }

  ngOnInit(): void {

    // array of objects
    this.people = PeoplesData.peoples;

    this.habitatsTypesApi.getHabitatsTypes().subscribe(
      data => {
        this.data = data;
        this.types = this.data.typeHabitats;
        console.log(this.types);
      });

    /**
     * form1 value validation
     */
     this.validationForm1 = this.formBuilder.group({
       title: new FormControl(null, Validators.required),
       description: new FormControl(null, Validators.required),
       prixParNuit: new FormControl(null, Validators.required),
       adresse: new FormControl(null, Validators.required),
       typeHabitat: new FormControl(null, Validators.required),
       vues: new FormControl([], [Validators.required, Validators.min(1)])
     });

    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      nombreChambre : ['', Validators.required],
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  /**
   * Returns form
   */
  get form1() {
    console.log(this.validationForm1.controls);
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2.controls;
  }

  /**
   * Go to next step 2 while form value is valid
   */
  form1Submit() {
    if(this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Get values from both forms and join them together
   */
  getData(){
    const merged = Object.assign(this.validationForm1.value, this.validationForm2.value);
    console.log(merged);
    return merged;
  }

  form2Submit() {
    if(this.validationForm2.valid) {
     this.authService.register(this.getData()).subscribe(
        result => {
          this.success = result.success;
          this.display = false;
        },
        error => {
          this.errors = error.error.error;
          console.log(this.errors);
        },
        () => {
          this.wizardForm.goToNextStep();
        }
      );
    }
    this.isForm2Submitted = true;

  }

  goToLogin(){
    this.router.navigate(['auth/login'])
  }

}
