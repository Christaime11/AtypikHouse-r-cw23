
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';

import { AuthService } from 'src/app/core/auth/auth.service';
import { HabitatsTypesService } from '../../../../core/habitats/habitats-types.service';
import {HabitatsService} from "../../../../core/habitats/habitats.service";


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
  YesOrNo: ({ value: number; name: string })[];
  formData: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private habitatsService : HabitatsService,
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

    // simple object Yes Or No
    this.YesOrNo = [
      {name: 'Oui', value: 1},
      {name: 'Non', value: 0}
      ];

    // array of habitats types
    this.habitatsTypesApi.getHabitatsTypes().subscribe(
      data => {
        this.data = data;
        this.types = this.data.typeHabitats;
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
      nombreChambre: new FormControl(1, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
      ]),
      nombreLit: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      hasTelevision: new FormControl(null, Validators.required),
      hasChauffage: new FormControl(null, Validators.required),
      hasInternet: new FormControl(null, Validators.required),
      hasClimatiseur: new FormControl(null, Validators.required),
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
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    console.log(this.validationForm2.controls);
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


  form2Submit() {
    if(this.validationForm2.valid) {

      this.formData =  new FormData();
      // tslint:disable-next-line:prefer-for-of
      for (let i =  0; i <  this.files.length; i++)  {
        this.formData.append('vues[]',  this.files[i]);
      }
      this.formData.append('title', this.validationForm1.get('title').value);
      this.formData.append('description', this.validationForm1.get('description').value);
      this.formData.append('nombreChambre', this.validationForm2.get('nombreChambre').value);
      this.formData.append('prixParNuit', this.validationForm1.get('prixParNuit').value);
      this.formData.append('nombreLit', this.validationForm2.get('nombreLit').value);
      this.formData.append('adresse', this.validationForm1.get('adresse').value);
      this.formData.append('hasTelevision', this.validationForm2.get('hasTelevision').value);
      this.formData.append('hasChauffage', this.validationForm2.get('hasChauffage').value);
      this.formData.append('hasInternet', this.validationForm2.get('hasInternet').value);
      this.formData.append('hasClimatiseur', this.validationForm2.get('hasClimatiseur').value);
      this.formData.append('typeHabitat', this.validationForm1.get('typeHabitat').value);

     this.habitatsService.addHabitat(this.formData).subscribe(
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
