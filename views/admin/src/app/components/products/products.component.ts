import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IRootState } from '../../redux/redux.module';

import { ProductActions } from '../../redux/actions/product.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @select(['productReducer', 'count']) readonly count$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IRootState>,
    private productActions: ProductActions,
  ) { }

  ngOnInit() {
  }

  increment() {
    this.ngRedux.dispatch(this.productActions.increment());
  }
}
