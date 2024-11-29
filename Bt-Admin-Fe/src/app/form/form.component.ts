import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../service/common-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService, private route: ActivatedRoute) { }

  credsObj: any = {
    email: "",
    name: "",
    role: [],
    mobile: "",
    pass: "",
    cpass: "",
    edu: "",
    otp: "",
    country: "",
    domain: "",
    startDate: "",
    logInTime: "",
    logOutTime: "",
  }

  isStartDate: boolean = false;
  isRole: boolean = false;
  isOtp: boolean = false;
  isverifyOtp: boolean = false;
  isSubmit: boolean = false;
  isActionKey: any;
  isActionValue: any;
  roles: string[] = ['Admin', 'Manager', 'DevOps', 'CTO', 'CEO', 'BA', 'HR', 'Developer'];
  // 
  selectedUser: any;
  userList: any[] = []
  id: any;
  message: any = '';
  isProjectDate:boolean = false;

  ngOnInit(): void {
    this.isActionKey = localStorage.getItem('Action')
    this.isActionValue = localStorage.getItem('Value')
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  toggleForm(): void {
    this.router.navigateByUrl("/bt/dashboard")
  }
  selectUser(user: any) {
    this.selectedUser = user;
  }

  projectData(){
    this.isProjectDate = true;
  }

  onContinue(key?: any, value?: any) {
    const actions: { [key: string]: { [value: string]: () => void } } = {
      'EMP': {
        'firstPhase': () => this.isRole = true,
        'secondPhase': () => this.isOtp = true,
      },
      'PROJ': {
        'firstPhase': () => this.isStartDate = true,
      }
    };
    actions[key]?.[value]?.();
  }

  submit(key?: any, value?: any) {

    if (key === "EMP" && value === "insert") {
      const payload: any = {}
      if (this.credsObj.name) payload.name = this.credsObj.name;
      if (this.credsObj.pass) payload.password = this.credsObj.pass;
      if (this.credsObj.email) payload.email = this.credsObj.email;
      if (this.credsObj.address) payload.address = this.credsObj.address;
      if (this.credsObj.edu) payload.qualification = this.credsObj.edu;
      if (this.credsObj.mobile) payload.mobileNumber = this.credsObj.mobile;
      if (this.credsObj.role && this.credsObj.role.length > 0) payload.role = this.credsObj.role;

      this.commonService.createUserDetails(payload).subscribe(
        (response) => {
          if (response.status === true) {
            window.alert("user created Successfully")
            this.toggleForm()
          }
        },
        (error) => {
          this.showMessage(error.error.message);
          this.removeEmail();
        }
      );

    } else if (key === "EMP" && value === "update") {
      const payload: any = {};
      if (this.credsObj.address) payload.address = this.credsObj.address;
      if (this.credsObj.edu) payload.qualification = this.credsObj.edu;
      if (this.credsObj.mobile) payload.mobileNumber = this.credsObj.mobile;
      if (this.credsObj.role && this.credsObj.role.length > 0) payload.role = this.credsObj.role;

      this.commonService.updateUserDetails(this.id, payload).subscribe(
        (response) => {

          if (response.status === true) {
            window.alert("Update User Successfully")
            this.toggleForm()
          }
        },
        (error) => {
          this.showMessage(error.error.message);
        }
      );
    } else if (key === "PROJ" && value === "insert") {
      const payload: any = {};
      if (this.credsObj.name) payload.name = this.credsObj.name;
      if (this.credsObj.country) payload.country = this.credsObj.country;
      if (this.credsObj.domain) payload.domain = this.credsObj.domain;
      if (this.credsObj.logInTime) payload.loginTime = this.credsObj.logInTime;
      if (this.credsObj.logOutTime) payload.logoutTime = this.credsObj.logOutTime;
      if (this.credsObj.startDate) payload.startDate = this.credsObj.startDate;
      if (this.selectedUser) payload.userId = this.selectedUser;

      this.commonService.createProjectDetails(payload).subscribe(
        (response) => {
          if (response.status === true) {
            window.alert("created Project Successfully")
            this.toggleForm()
          }
        },
        (error) => {
          this.showMessage(error.error.message);
        }
      );

    } else if (key === "PROJ" && value === "update") {
      const payload = {
        userId: this.selectedUser
      }
      this.commonService.updateProjectDetails(this.id, payload).subscribe(
        (response) => {
          if (response.status === true) {
            window.alert("Update Project Successfully")
            this.toggleForm()
          }
        },
        (error) => {
          this.showMessage(error.error.message);
        }
      );

    }

  }

  removeEmail() {
    this.commonService.removeEmail({
      email: this.credsObj.email,
      action: "remove"
    }).subscribe(
      () => {
      },
      (error) => {
        console.log("")
      }
    );
  }

  sendOtp() {
    const payload = {
      email: this.credsObj.email,
      action: 'createUser'
    }
    this.commonService.sendOtp(payload).subscribe(
      (response) => {
        if (response.status === true) {
          window.alert("Sent OTP Successfully")
        }
        this.isverifyOtp = true;
        this.isOtp = false
      },
      (error) => {
        if (error.status === 400) {
          this.showMessage(error.error.message);
        }

      }
    );
  }
  verifyOtp() {
    const payload = {
      email: this.credsObj.email,
      otp: this.credsObj.otp
    }

    this.commonService.verifyOTP(payload).subscribe(
      (response) => {
        if (response) {
          this.isSubmit = true
          this.isverifyOtp = false;
        }
      },
      (error) => {
        this.showMessage(error.error.message);
      }
    );
  }


  roleSelectionChange(event: MatSelectChange) {
    let selectedRoles = event.value;

    // Ensure no more than 2 roles can be selected
    if (selectedRoles.length > 2) {
      alert('You can select up to two roles only.');
      selectedRoles.pop();
    }

    if (selectedRoles.length === 2 && !selectedRoles.includes('Admin') && !selectedRoles.includes('Manager')) {
      alert('One of the selected roles must be "Admin" if selecting two roles.');
      selectedRoles.pop();
    }

    // Update the credsObj.role with the validated selection
    this.credsObj.role = [...selectedRoles];
  }

  fetchUsers() {
    this.commonService.fetchUserDetails().subscribe(
      (response) => {
        if (response && response.data) {
          this.userList = response.data;
        } else {
          this.userList = [];
        }
      },
      (error) => {
        return error.error.message;
      }
    );
  }

  showMessage(msg: any) {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }
}
