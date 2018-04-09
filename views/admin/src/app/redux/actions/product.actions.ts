import { Action } from 'redux';

import ActionsTypes from '../../../constants/ActionTypes';

export class ProductActions {
  getProducts = (): Action => ({
    type: ActionsTypes.REQUEST_GET_PRODUCT,
  })

  increment = (): Action => ({
    type: ActionsTypes.INCREMENT,
  })
}
