import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { NextersComponent } from './components/nexters/nexters.component';
import { RecruitComponent } from './components/recruit/recruit.component';

import { AppRoutingModule } from './app-routing.modules';
import { ReduxModule } from './redux/redux.module';

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
    ReduxModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
