import { RecipeModule } from './recipe/recipe.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'' },
  { path:'',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)},
  {path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
