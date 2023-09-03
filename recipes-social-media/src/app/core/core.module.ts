import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [

  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
