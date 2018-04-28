import { AnyAction } from 'redux';
import * as Immutable from 'immutable';

import ActionTypes from '../../constants/ActionTypes';
import { Group } from '../../models/group.model';

export interface IGroupState {
  groups: Immutable.List<Group>;
}

export const groupInitState: IGroupState = {
  groups: Immutable.List<Group>(),
};

export const groupReducer = (state: IGroupState = groupInitState, action: AnyAction): IGroupState => {
  switch (action.type) {
    case ActionTypes.REQUEST_GET_NEXTERS_SUCCESS: {
      const idx = state.groups.findIndex(group => action.payload.group._id);
      return {
        ...state,
        groups: idx === -1 ? state.groups.push(new Group(action.payload.group)) : state.groups.set(idx, new Group(action.payload.group)),
      }
    }

    default:
      return state;
  }
};
