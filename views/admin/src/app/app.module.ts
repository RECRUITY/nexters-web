import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { NextersComponent } from './components/nexters/nexters.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { ButtonComponent } from './elements/button/button.component';

import { AppRoutingModule } from './app-routing.modules';
import { ReduxModule } from './redux/redux.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NextersComponent,
    RecruitComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReduxModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
