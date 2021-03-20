import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { TokenService } from '../../../../core/auth//token.service';
import { AuthStateService } from '../../../../core/auth//auth-state.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        this.success = result;
        this.responseHandler(result.token);
        console.log('authentication successful ' + result.token);
        localStorage.setItem('isLoggedin', 'true');
      },
      res => {
        this.errors = res.error.error;

      }, () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate([this.returnUrl]);
        }
      }
    );
  }

  // Handle response
  // tslint:disable-next-line:typedef
  responseHandler(data){
    this.token.handleData(data);
  }

}
