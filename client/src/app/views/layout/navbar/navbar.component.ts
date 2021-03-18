import { Component, OnInit, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../../core/auth/auth.service';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { AuthStateService } from 'src/app/core/auth/auth-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isBasicExampleMenuCollapsed = true;
  menuItems = [];
  private UserProfile: any;
  public isMenuCollapsed = true;
  error: any;
  /**
   * Fixed header menu on scroll
   */
  @HostListener('window:scroll', ['$event']) getScrollHeight(event) {
    if (window.matchMedia('(min-width: 992px)').matches) {
      let header: HTMLElement = document.querySelector('.horizontal-menu') as HTMLElement;
      if(window.pageYOffset >= 60) {
        header.parentElement.classList.add('fixed-on-scroll')
      } else {
        header.parentElement.classList.remove('fixed-on-scroll')
      }
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,

    private renderer: Renderer2,
    private authstate: AuthStateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuItems = MENU;

    /**
     * closing the header menu after route change in tablet/mobile devices
     */
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          document.querySelector('.horizontal-menu .bottom-navbar').classList.remove('header-toggled');
        }
      });
    }

    /**
     * User profile data . If can't retrieve data : logout.
     */
    this.authService.profileUser().subscribe(
      data => {
        this.UserProfile = data.user;
      }/*,
      err => {
        this.error = err.status;
        if (this.error != 200) {
          this.authstate.setAuthState(false);
          this.router.navigate(['/auth/login']);
        }
      }*/);
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
  }

  /**
   * Logout
   */
  onLogout(e) {
    this.authService.onLogout(e);
  }

  /**
   * Toggle header menu in tablet/mobile devices
   */
  toggleHeaderMenu() {
    document.querySelector('.horizontal-menu .bottom-navbar').classList.toggle('header-toggled');
  }

}
