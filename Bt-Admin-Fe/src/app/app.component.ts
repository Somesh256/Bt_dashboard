import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BtComponent } from './bt/bt.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean; 
}


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoginComponent, FormsModule, CommonModule, BodyComponent, SidenavComponent, BtComponent]
})
export class AppComponent {
  title = 'final';
}
