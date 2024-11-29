import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {

  private jwtHelper: JwtHelperService;
  constructor() {
    this.jwtHelper = new JwtHelperService();
  }
  roleClass = 'role-class';

  roles: string[] = [];

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const data = this.jwtHelper.decodeToken(token);
      this.roles = data.role
    }
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.roles.includes(role));
  }
}
