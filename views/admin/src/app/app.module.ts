import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { NextersComponent } from './components/nexters/nexters.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { ButtonComponent } from './elements/button/button.component';

import { AppRoutingModule } from './app-routing.modules';
import { ReduxModule } from './redux/redux.module';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { InputComponent } from './elements/input/input.component';
import { TextareaComponent } from './elements/textarea/textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NextersComponent,
    RecruitComponent,
    ButtonComponent,
    DeleteProductComponent,
    CreateProductComponent,
    InputComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReduxModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
