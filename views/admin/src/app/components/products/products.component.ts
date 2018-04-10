import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IRootState } from '../../redux/redux.module';

import { ProductActions } from '../../redux/actions/product.actions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @select(['productReducer', 'products']) readonly products$: Observable<Product[]>;
  selected: Product;
  showDeleteModal = false;

  constructor(
    private ngRedux: NgRedux<IRootState>,
    private productActions: ProductActions,
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch(this.productActions.getProducts());
  }

  handleClickDelete(product) {
    console.log('hello');
    this.showDeleteModal = true;
    this.selected = product;
  }
}
