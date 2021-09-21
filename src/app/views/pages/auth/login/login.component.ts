import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { TokenService } from '../../../../core/auth/token.service';
import { AuthStateService } from '../../../../core/auth/auth-state.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: any;
  private success: any;
  private errors: any;
  isFormSubmitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void{

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
      password: new FormControl(null, Validators.required)
    });

    this.isFormSubmitted = false;

  }

  get form() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  onSubmit() {
    if(this.loginForm.valid) {

      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.success = result;
          this.responseHandler(result.token);
          this.authState.setAuthState(true);
          this.loginForm.reset();
        },
        res => {
          this.errors = res.error.error;
        }, () => {
          this.router.navigate(['/habitats']);
        }
      );

      /*axios
        .post('http://localhost:1337/auth/local', {
          identifier: 'user@gmail.com',
          password: 'pmtlinusa',
        })
        .then(response => {
          console.log(response);
          this.token.handleData(response.data.jwt);
        });*/
    }
    this.isFormSubmitted = true;
  }

  responseHandler(data){
    this.token.handleData(data);
  }

}
