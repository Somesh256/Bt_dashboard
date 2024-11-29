import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';


interface userDataMap {
  name:string
  qualification:string[],
  role:string,
  email:string,
  mobileNumber: number,
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private jwtHelper: JwtHelperService;
  constructor(private commonService: CommonService) {
    this.jwtHelper = new JwtHelperService();
   }

   userId:string = ''
   userData: userDataMap = {
    name:"",
    qualification:[],
    role:"",
    email:"",
    mobileNumber:0
   }
  

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const data = this.jwtHelper.decodeToken(token);
      this.userId = data._id;
      this.fetchUserDetails(this.userId)
    }

    
  }

  fetchUserDetails(id:any){
    
    //fetch userDetails
    this.commonService.fetchUserDetails(id).subscribe(
      (response) => {
        this.userData = {
          name: response.data.name,
          qualification:response.data.qualification,
          role:response.data.role.filter((r: string) => r !== 'Admin'),
          email:response.data.email,
          mobileNumber:response.data.mobileNumber
        }
      },
      (error) => {
        return error.error.message;
      }
    );
  }

}
