import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from '../body/body.component';
import { SidenavComponent } from '../sidenav/sidenav.component';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean; 
}

@Component({
  selector: 'app-bt',
  standalone: true,
  imports: [RouterOutlet, BodyComponent, SidenavComponent,],
  templateUrl: './bt.component.html',
  styleUrl: './bt.component.scss'
})
export class BtComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;
  isLoggedIn: boolean = false;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  updateLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }
}
