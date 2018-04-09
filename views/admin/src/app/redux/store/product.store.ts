import { Action } from 'redux';

import ActionTypes from '../../constants/ActionTypes';
import { Product } from '../../models/product.model';

interface TempAction extends Action {
  type: string;
  payload: {
    [key: string]: any,
  };
}


export interface IProductState {
  products: Product[];
}

export const productInitState: IProductState = {
  products: [],
};

export const productReducer = (state: IProductState = productInitState, action: TempAction): IProductState => {
  switch (action.type) {
    case ActionTypes.REQUETS_GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.products.map(product => new Product(product)),
      };

    default:
      return state;
  }
};
