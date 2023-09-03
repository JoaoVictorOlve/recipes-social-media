import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { CreateFormComponent } from './forms/create-form/create-form.component';
import { EditFormComponent } from './forms/edit-form/edit-form.component';

@NgModule({
  declarations: [
    DetailComponent,
    HomeComponent,
    CreateFormComponent,
    EditFormComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
