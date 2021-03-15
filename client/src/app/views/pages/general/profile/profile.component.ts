import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private data: any;
  private errors: any;
  private user: User
  private UserProfile: any;
  private username: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.profileUser().subscribe(
      data => {
        this.UserProfile = data.user;
        this.username = this.UserProfile.name;
      });
  }

}
