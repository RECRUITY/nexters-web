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

  createProduct = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_CREATE_PRODUCT)
      .mergeMap((action) => {
        return this.httpClient.post('http://localhost:8080/api/products', action.payload)
          .map(payload => ({
            type: ActionTypes.REQUEST_CREATE_PRODUCT_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_CREATE_PRODUCT_ERROR,
            payload,
          }));
      })
  )

  updateProduct = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_UPDATE_PRODUCT)
      .mergeMap((action) => {
        return this.httpClient.put(`http://localhost:8080/api/products/${action.payload.id}`, action.payload)
          .map(payload => ({
            type: ActionTypes.REQUEST_UPDATE_PRODUCT_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_UPDATE_PRODUCT_ERROR,
            payload,
          }));
      })
  )

  deleteProduct = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_DELETE_PRODUCT)
      .mergeMap((action) => {
        const id = action.payload.id;
        return this.httpClient.delete(`http://localhost:8080/api/products/${id}`)
          .map(payload => ({
            type: ActionTypes.REQUEST_DELETE_PRODUCT_SUCCESS,
            payload: { id },
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_DELETE_PRODUCT_ERROR,
            payload,
          }));
      })
  )

  uploadProductImage = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_UPLOAD_PRODUCT_IMAGE)
      .mergeMap((action) => {
        const id = action.payload.id;
        const formData = new FormData();
        formData.append('image', action.payload.image);
        return this.httpClient.post(`http://localhost:8080/api/products/${id}/images`, formData)
          .map(payload => ({
            type: ActionTypes.REQUEST_UPLOAD_PRODUCT_IMAGE_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_UPLOAD_PRODUCT_IMAGE_ERROR,
            payload,
          }));
      })
  )
}
