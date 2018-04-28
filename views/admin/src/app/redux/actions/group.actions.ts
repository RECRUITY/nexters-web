import { AnyAction } from 'redux';

import ActionsTypes from '../../constants/ActionTypes';

export class GroupActions {
  getNexters = (): AnyAction => ({
    type: ActionsTypes.REQUEST_GET_NEXTERS,
  })
}
