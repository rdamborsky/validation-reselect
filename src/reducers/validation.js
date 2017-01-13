import Immutable from 'immutable';

import { CHECK_OWNER_REQUEST, CHECK_OWNER_SUCCESS, CHECK_OWNER_FAILURE } from '../actionTypes';

// reducer concerned only with validation specific state
const initialValidationState = Immutable.fromJS({
  isCheckingOwner: false,
  ownersAccessFlags: {}
});

export default function validation(state = initialValidationState, action) {
  switch (action.type) {

    case CHECK_OWNER_REQUEST:
      return state.
        set('isCheckingOwner', true).
        setIn(['ownersAccessFlags', action.configId], false);

    case CHECK_OWNER_SUCCESS:
      return state.
        set('isCheckingOwner', false).
        setIn(['ownersAccessFlags', action.configId], action.result.hasAccess);

    case CHECK_OWNER_FAILURE:
      return state.set('isCheckingOwner', false);

    default:
      return state;
  }
}
