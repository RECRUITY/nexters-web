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
import { GroupActions } from './actions/group.actions';

import { ProductEpics } from './epics/product.epics';
import { GroupEpics } from './epics/group.epics';

import { productReducer, productInitState, IProductState } from './store/product.store';
import { groupReducer, groupInitState, IGroupState } from './store/group.store';

export interface IRootState {
  productReducer: IProductState;
  groupReducer: IGroupState;
}

const rootReducerInitState = {
  productReducer: productInitState,
  groupReducer: groupInitState,
};

const rootReducer = combineReducers<IRootState>({
  productReducer,
  groupReducer,
});

@NgModule({
  imports: [
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [
    ProductActions,
    GroupActions,

    ProductEpics,
    GroupEpics,
  ],
})
export class ReduxModule {
  constructor(
    private ngRedux: NgRedux<IRootState>,
    private productEpics: ProductEpics,
    private groupEpics: GroupEpics,
  ) {
    const middleware: any = [
      createEpicMiddleware(
        combineEpics(
          this.productEpics.getProducts,
          this.productEpics.createProduct,
          this.productEpics.updateProduct,
          this.productEpics.deleteProduct,
          this.productEpics.uploadImageProduct,
          this.groupEpics.getNextres,
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
