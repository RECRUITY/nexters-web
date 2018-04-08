import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ProductsComponent } from './core/components/products/products.component';
import { NextersComponent } from './core/components/nexters/nexters.component';
import { RecruitComponent } from './core/components/recruit/recruit.component';

import { AppRoutingModule } from './app-routing.modules';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NextersComponent,
    RecruitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
