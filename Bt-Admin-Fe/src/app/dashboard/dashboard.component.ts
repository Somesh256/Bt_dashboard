import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from '../body/body.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../service/common-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, BodyComponent, SidenavComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService, private commonService: CommonService, private router: Router) { }
  isAdmin :boolean = false;
  totalUser:number = 0
  totalProject:number = 0;
  userRole: string[] = [];

  ngOnInit(): void {
    const userData = this.auth.getUserRole()
    this.fetchDetails();
    this.userRole = userData.role
    this.isAdmin = this.userRole.includes("Admin");
    // this.isAdmin = userData.role.includes("Admin");
  }

  fetchDetails(){
    
    //fetch userDetails
    this.commonService.fetchUserDetails().subscribe(
      (response) => {
        this.totalUser = response.total-1;
      },
      (error) => {
        return error.error.message;
      }
    );

    //fetch project Details
    this.commonService.fetchProjectDetails().subscribe(
      (response) => {
        this.totalProject = response.total-1;
      },
      (error) => {
        return error.error.message;
      }
    );


  }

  manage(){
    this.router.navigateByUrl("/bt/manage")
  }

}
