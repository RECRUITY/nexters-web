import { AnyAction } from 'redux';

import ActionsTypes from '../../constants/ActionTypes';

export class ProductActions {
  getProducts = (): AnyAction => ({
    type: ActionsTypes.REQUEST_GET_PRODUCT,
  })

  deleteProduct = (payload: { id: string }): AnyAction => ({
    type: ActionsTypes.REQUEST_DELETE_PRODUCT,
    payload,
  })
}
