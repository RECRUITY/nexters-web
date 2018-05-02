import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';

import ActionTypes from '../../constants/ActionTypes';
import { ProductActions } from '../actions/product.actions';

@Injectable()
export class GroupEpics {
  constructor(
    private httpClient: HttpClient,
  ) { }

  getNextres = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_GET_NEXTERS)
      .mergeMap(() => {
        return this.httpClient.get('http://localhost:8080/api/groups/nexters')
          .map(payload => ({
            type: ActionTypes.REQUEST_GET_NEXTERS_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_GET_NEXTERS_ERROR,
            payload,
          }));
      })
  )

  uploadGroupImage = (action$: any) => (
    action$.ofType(ActionTypes.REQUEST_UPLOAD_NEXTERS_IMAGE)
      .mergeMap((action) => {
        const id = action.payload.id;
        const formData = new FormData();
        formData.append('image', action.payload.image);
        return this.httpClient.post(`http://localhost:8080/api/groups/${id}/images`, formData)
          .map(payload => ({
            type: ActionTypes.REQUEST_UPLOAD_NEXTERS_IMAGE_SUCCESS,
            payload,
          }))
          .catch(payload => Observable.of({
            type: ActionTypes.REQUEST_UPLOAD_NEXTERS_IMAGE_ERROR,
            payload,
          }));
      })
  )
}
