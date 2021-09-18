import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: boolean;
  isForm2Submitted: boolean;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  errors: any;
  success: any;
  display:boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    /**
     * form1 value validation
     */
     this.validationForm1 = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      telephone : ['', Validators.required],
    });

    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      adresse : ['', Validators.required],
      password : ['', Validators.required],
      password_confirmation : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

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
    var merged = Object.assign(this.validationForm1.value, this.validationForm2.value);
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
