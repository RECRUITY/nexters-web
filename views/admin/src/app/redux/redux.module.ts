import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { combineReducers } from 'redux';

import { ProductActions } from './actions/product.actions';
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
  ],
  providers: [
    ProductActions,
  ],
})
export class ReduxModule {
  constructor(ngRedux: NgRedux<IRootState>) {
    ngRedux.configureStore(
      rootReducer,
      rootReducerInitState,
    );
  }
}
