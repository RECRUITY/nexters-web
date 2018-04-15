import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NextersComponent } from './components/nexters/nexters.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/nexters', pathMatch: 'full' },
  { path: 'nexters', component: NextersComponent },
  { path: 'recruit', component: RecruitComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/new', component: CreateProductComponent },
  { path: 'products/:id/edit', component: UpdateProductComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
