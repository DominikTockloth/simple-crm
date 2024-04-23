import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/firebase-auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {
  isDrawerOpen: boolean = false;
  isUserLoggedIn: boolean = true;
  isScreenBelow850: boolean = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private renderer: Renderer2,
    private router: Router,
    public authservice: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 340px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.renderer.listen('window', 'resize', () => {
      this.checkScreenSize();
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  onNoClick() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  checkScreenSize() {
    if (this.isScreenBelow850 = window.innerWidth < 850) {
      this.isDrawerOpen = false;
    } else {
      this.isDrawerOpen = true;
    }
  }

  logOut() {
    this, this.authservice.logout();
    this.isDrawerOpen = !this.isDrawerOpen;
    this.isUserLoggedIn = false;
    this.router.navigate(['sign-in']);

  }

}
