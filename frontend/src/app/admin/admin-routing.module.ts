import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { Header1Component } from './header1/header1.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { EducationComponent } from './education/education.component';
const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '', component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: Header1Component },
    { path: 'header1', component: Header1Component },
    { path: 'expertise', component: ExpertiseComponent },
    { path: 'education', component: EducationComponent },
    
    // Add more routes for each sub-page
  ]
},
  // Add more routes for admin-only pages as needed
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 
 
}
