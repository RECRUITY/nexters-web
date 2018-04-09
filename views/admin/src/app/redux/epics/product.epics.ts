import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';

import ActionTypes from '../../constants/ActionTypes';
import { ProductActions } from '../actions/product.actions';

@Injectable()
export class ProductEpics {
  constructor(
    private httpClient: HttpClient,
  ) { }

  getProducts = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_GET_PRODUCT)
      .mergeMap(() => {
        return this.httpClient.get('http://localhost:8080/api/products')
          .map(payload => ({
            type: ActionTypes.REQUETS_GET_PRODUCT_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_GET_PRODUCT_ERROR,
            payload,
          }));
      })
  )
}
