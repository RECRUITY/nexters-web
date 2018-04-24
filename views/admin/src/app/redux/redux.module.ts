import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { ProductActions } from './actions/product.actions';

import { ProductEpics } from './epics/product.epics';

import { productReducer, productInitState, IProductState } from './store/product.store';

export interface IRootState {
  productReducer: IProductState;
}

const rootReducerInitState = {
  productReducer: productInitState,
};

const rootReducer = combineReducers<IRootState>({
  productReducer,
});

@NgModule({
  imports: [
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [
    ProductActions,
    ProductEpics,
  ],
})
export class ReduxModule {
  constructor(
    private ngRedux: NgRedux<IRootState>,
    private productEpics: ProductEpics,
  ) {
    const middleware: any = [
      createEpicMiddleware(
        combineEpics(
          this.productEpics.getProducts,
          this.productEpics.createProduct,
          this.productEpics.updateProduct,
          this.productEpics.deleteProduct,
          this.productEpics.uploadImageProduct,
        )
      ),
    ];

    ngRedux.configureStore(
      rootReducer,
      rootReducerInitState,
      middleware,
    );
  }
}
