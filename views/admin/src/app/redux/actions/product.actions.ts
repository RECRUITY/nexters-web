import { AnyAction } from 'redux';

import ActionsTypes from '../../constants/ActionTypes';

export class ProductActions {
  getProducts = (): AnyAction => ({
    type: ActionsTypes.REQUEST_GET_PRODUCT,
  })

  createProduct = (payload: { title: string, description: string }) => ({
    type: ActionsTypes.REQUEST_CREATE_PRODUCT,
    payload,
  })

  updateProduct = (payload: { id: string, title: string, description: string }) => ({
    type: ActionsTypes.REQUEST_UPDATE_PRODUCT,
    payload,
  })

  deleteProduct = (payload: { id: string }): AnyAction => ({
    type: ActionsTypes.REQUEST_DELETE_PRODUCT,
    payload,
  })

  uploadImage = (payload: { id: string, image }) => ({
    type: ActionsTypes.REQUEST_UPLOAD_PRODUCT_IMAGE,
    payload,
  })
}
