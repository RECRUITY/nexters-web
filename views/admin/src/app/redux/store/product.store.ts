import { AnyAction } from 'redux';
import * as Immutable from 'immutable';

import ActionTypes from '../../constants/ActionTypes';
import { Product } from '../../models/product.model';

export interface IProductState {
  products: Immutable.List<Product>;
}

export const productInitState: IProductState = {
  products: Immutable.List<Product>(),
};

export const productReducer = (state: IProductState = productInitState, action: AnyAction): IProductState => {
  switch (action.type) {
    case ActionTypes.REQUETS_GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: Immutable.List(action.payload.products.map(product => new Product(product))),
      };

    case ActionTypes.REQUEST_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.push(new Product(action.payload.product)),
      }

    case ActionTypes.REQUEST_UPDATE_PRODUCT_SUCCESS: {
      const idx = state.products.findIndex(product => product.id === action.payload.product._id);
      return {
        ...state,
        products: idx !== -1 ? state.products.set(idx, new Product(action.payload.product)) : state.products,
      }
    }

    case ActionTypes.REQUEST_DELETE_PRODUCT_SUCCESS: {
      const idx = state.products.findIndex(product => product.id === action.payload.id);
      return {
        ...state,
        products: idx !== -1 ? state.products.delete(idx) : state.products,
      }
    }

    default:
      return state;
  }
};
