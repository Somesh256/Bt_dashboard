import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { LogoutComponent } from './logout/logout.component';
import { BtComponent } from './bt/bt.component';
import { authGuard } from './auth.guard';
import { ManageComponent } from './manage/manage.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'bt',
    component: BtComponent,
    children: [
      { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'roles', component: RoleComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'project', component: ProjectComponent, canActivate: [authGuard] },
      { path: 'logout', component: LogoutComponent },
      { path: 'manage', component: ManageComponent, canActivate: [authGuard] },
      { path: 'form', component: FormComponent, canActivate: [authGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
];

// export const route: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     children: [
//       { path: "", redirectTo: "roles", pathMatch: "full" },
//       { path: 'roles', component: RoleComponent },
//       { path: 'profile', component: ProfileComponent },
//       { path: 'project', component: ProjectComponent },
//       { path: 'logout', component: LogoutComponent },
//     ]
//   },
//   { path: 'login', component: LoginComponent },
//   { path: '**', component: LogoutComponent },
// ];


// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     children: [
//       { path: "", redirectTo: "roles", pathMatch: "full" },
//       { path: 'roles', component: RoleComponent },
//       { path: 'profile', component: ProfileComponent },
//       { path: 'project', component: ProjectComponent },
//       { path: 'logout', component: LogoutComponent },
//     ]
//   },
//   { path: 'login', component: LoginComponent },
//   { path: '**', component: LogoutComponent },
// ];
