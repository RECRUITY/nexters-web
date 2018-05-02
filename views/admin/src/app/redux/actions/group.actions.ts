import { AnyAction } from 'redux';

import ActionTypes from '../../constants/ActionTypes';

export class GroupActions {
  getNexters = (): AnyAction => ({
    type: ActionTypes.REQUEST_GET_NEXTERS,
  })

  uploadImage = (payload: { id: string, image }) => ({
    type: ActionTypes.REQUEST_UPLOAD_NEXTERS_IMAGE,
    payload,
  })
}
