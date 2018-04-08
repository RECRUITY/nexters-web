import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NextersComponent } from './core/components/nexters/nexters.component';
import { RecruitComponent } from './core/components/recruit/recruit.component';
import { ProductsComponent } from './core/components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/nexters', pathMatch: 'full' },
  { path: 'nexters', component: NextersComponent },
  { path: 'recruit', component: RecruitComponent },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
