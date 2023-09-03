import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    HttpClientModule,
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
