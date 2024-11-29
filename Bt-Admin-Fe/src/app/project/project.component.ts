import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common-service.service';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  constructor(private commonService: CommonService, private datePipe: DatePipe, private auth: AuthService) {
  }
  projects: any[] = [];
  showAssignedProject: boolean = false;
  filteredProjects: any[] = [];

  ngOnInit(): void {
    this.fetchProjectDetail()
  }

  fetchProjectDetail() {
    this.commonService.getProjects().subscribe(
      (response) => {
        this.projects = response.map((project: any) => {
          project.startDate = this.datePipe.transform(project.startDate, 'dd-MM-yyyy');
          return project;
        });
        this.applyFilter();
      },
      (error) => {
        return error.error.message;
      }
    );
  }

  applyFilter() {
    const userData = this.auth.getUserRole()
    if (this.showAssignedProject) {
      this.filteredProjects = this.projects.filter(project => project.userName === userData.username);
    } else {
      this.filteredProjects = this.projects;
    }
  }
}
