import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateFormComponent } from './forms/create-form/create-form.component';
import { EditFormComponent } from './forms/edit-form/edit-form.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'detail/:id', component:DetailComponent},
  {path: 'create-form', component:CreateFormComponent, canActivate: [AuthGuard] },
  {path: 'edit-form/:id', component:EditFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
