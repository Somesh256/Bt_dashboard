import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<boolean>();
  

  constructor(private commonService: CommonService, private router: Router ) { }

  credsObj: any = {
    email: "",
    pass: "",
    otp: "",
    cpass: ""
  }
  message: any = '';
  flag: boolean | undefined;
  isLoginForm: boolean = true;
  showOtpInput: boolean = false;
  iscreatePassword: boolean = false;

  ngOnInit(): void {
  }

  onLogin() {
    const payload = {
      email: this.credsObj.email,
      password: this.credsObj.pass
    }

    this.commonService.login(payload).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem("isLoggin","true");
          localStorage.setItem('jwtToken', response.token);
          this.router.navigateByUrl("/bt")
        }
      },
      (error) => {
        this.loginSuccess.emit(false);
        this.showMessage(error.error.message);
      }
    );
  }

  onForgotPassword(): void {
    this.isLoginForm = false;
  }

  sendOtp(): void {
    const payload = {
      email: this.credsObj.email,
    }

    this.commonService.sendOtp(payload).subscribe(
      (response) => {
        if (response) {
          this.showOtpInput = true;
        }
      },
      (error) => {
        this.loginSuccess.emit(false);
        this.showMessage(error.error.message);
      }
    );
  }

  verifyOtp(): void {
    const payload = {
      email: this.credsObj.email,
      otp: this.credsObj.otp
    }
    this.commonService.verifyOTP(payload).subscribe(
      (response) => {
        if (response) {
          this.iscreatePassword = true;
          this.showOtpInput = false;
        }
      },
      (error) => {
        this.loginSuccess.emit(false);
        this.showMessage(error.error.message);
      }
    );
  }
  
  createPassword(): void {
    const payload = {
      email: this.credsObj.email,
      updatePassword: this.credsObj.pass,
      OTP: this.credsObj.otp
    }
    if (this.credsObj.pass === this.credsObj.cpass) {
      this.commonService.updatePassword(payload).subscribe(
        (response) => {
          window.alert(response.message);
          this.isLoginForm = !this.isLoginForm;
        },
        (error) => {
          this.loginSuccess.emit(false);
          this.showMessage(error.error.message);
        }
      );
    } else {
      window.alert('Passwords do not match. Please try again.');
    }
  }

  toggleForm(): void {
    this.isLoginForm = !this.isLoginForm;
    this.showOtpInput = false;
    this.iscreatePassword = false;
  }

  showMessage(msg: any){
    this.message = msg;
        setTimeout(() => {
          this.message = '';
        }, 2000);
  }
}
