import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private router: Router) {
    this.logout();
  }

  logout() {
    // sessionStorage.removeItem('isLoggin');
    localStorage.setItem("isLoggin","false")
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
