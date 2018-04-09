import { Action } from 'redux';

import ActionTypes from '../../../constants/ActionTypes';

export interface IProductState {
  count: number;
}

export const productInitState: IProductState = {
  count: 0,
};

export const productReducer = (state: IProductState = productInitState, action: Action): IProductState => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
};
