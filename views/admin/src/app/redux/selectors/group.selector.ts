import * as Immutable from 'immutable';
import { createSelector } from 'reselect';

import { IRootState } from '../redux.module';
import { IGroupState } from '../store/group.store';

import { Group } from '../../models/group.model';

const getNexters = createSelector<IRootState, Immutable.List<Group>, Group>(
  state => state.groupReducer.groups,
  groups => groups.find(group => group.name === 'nexters', null, new Group()),
);

export default {
  getNexters,
};
