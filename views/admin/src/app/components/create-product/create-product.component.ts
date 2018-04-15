import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { IRootState } from '../../redux/redux.module';

import { ProductActions } from '../../redux/actions/product.actions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  title = '';
  description = '';

  constructor(
    private router: Router,
    private ngRedux: NgRedux<IRootState>,
    private productActions: ProductActions,
  ) { }

  ngOnInit() {
  }

  handleClickCreate() {
    const payload = {
      title: this.title,
      description: this.description,
    };
    this.ngRedux.dispatch(this.productActions.createProduct(payload));
    this.router.navigate(['/products']);
  }
}
