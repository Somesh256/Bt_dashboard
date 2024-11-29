import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonService } from '../service/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {

  constructor(private commonService: CommonService, private datePipe: DatePipe, private router: Router) { }

  employeeData: any[] = [];
  projectData: any[] = [];
  message: any = '';

  ngOnInit(): void {
    this.fetchEmployeeData()
    // Fetch initial data (if needed)
  }

  fetchEmployeeData() {
    this.commonService.fetchUserDetails().subscribe(
      (response) => {
        this.projectData = [];
        return this.employeeData = response.data
      },
      (error) => {
        return error.error.message;
      }
    );


    this.employeeData = ["response"];
    this.projectData = [];
  }

  fetchProjectData() {
    this.commonService.getProjects().subscribe(
      (response) => {
        this.employeeData = [];
        this.projectData = response.map((project: any) => {
          project.startDate = this.datePipe.transform(project.startDate, 'dd-MM-yyyy');
          return project;
        });

      },
      (error) => {
        return error.error.message;
      }
    );
  }

  rederectForm(key: string, value: string, id?: string): void {
    const navigationExtras: any = {
      queryParams: { id: id }
    };
    if (value === "insert") {
      this.router.navigateByUrl("/bt/form")
      localStorage.setItem("Action", key)
      localStorage.setItem("Value", value);
    } else {
      localStorage.setItem("Action", key);
      localStorage.setItem("Value", value);
      this.router.navigate(['/bt/form'], navigationExtras);
    }
  }

  dropEntity(id: string, action: string) {
    if (action === "user") {
      this.commonService.removeUser(id).subscribe(
        (response) => {
          if (response.status === true) {
            window.alert("Drop Successfully")
            window.location.reload();
          }
        },
        (error) => {
          this.showMessage(error.error.message);
        }
      );
    }else if(action === "project"){
      this.commonService.removeProject(id).subscribe(
        (response) => {
          if (response.status === true) {
            window.alert("Drop Successfully")
            window.location.reload();
          }
        },
        (error) => {
          this.showMessage(error.error.message);
        }
      );
    }
  }

  showMessage(msg: any) {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

}
