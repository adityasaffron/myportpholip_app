import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { Header1Component } from './header1/header1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpertiseComponent } from './expertise/expertise.component';
import { EducationComponent } from './education/education.component';



@NgModule({
  declarations: [
    AdminComponent,
    Header1Component,
    ExpertiseComponent,
    EducationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
