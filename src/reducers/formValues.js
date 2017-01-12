import Immutable from 'immutable';

import * as types from '../actionTypes';

// formValues reducer takes care about current values of fields
// and does not worry about validation
// it could be organized better (extracting descriptors and configs into separate reducers)

const initialValuesState = Immutable.fromJS({
  appName: '',
  configs: {},
  selectedConfigId: '',
  descriptors: {}
});

let configsCounter = 0;
const createNewConfig = () => {
  configsCounter++;
  const id = +new Date();
  return Immutable.Map({
    id: `cnf-${id}`,
    name: `Untitled ${configsCounter}`,
    descriptor: '',
    owner: ''
  });
};

export default function formValues(state = initialValuesState, action) {
  switch (action.type) {

    case types.LOAD_DESCRIPTORS_SUCCESS: {
      let descriptors = {};
      action.result.descriptors.forEach(desc => descriptors[desc.id] = desc);
      return state.set('descriptors', Immutable.fromJS(descriptors));
    }

    case types.CHANGE_APP_NAME:
      return state.set('appName', action.value);

    case types.ADD_CONFIG: {
      const newConfig = createNewConfig();
      const id = newConfig.get('id');
      return state.
        setIn(['configs', id], newConfig).
        set('selectedConfigId', id);
    }

    case types.SELECT_CONFIG:
      return state.set('selectedConfigId', action.id);

    case types.CHANGE_CONFIG_NAME: {
      const selected = state.get('selectedConfigId');
      return state.setIn(['configs', selected, 'name'], action.value);
    }

    case types.CHANGE_CONFIG_DESCRIPTOR: {
      const selected = state.get('selectedConfigId');
      return state.setIn(['configs', selected, 'descriptor'], action.value);
    }

    case types.CHANGE_CONFIG_OWNER: {
      const selected = state.get('selectedConfigId');
      return state.setIn(['configs', selected, 'owner'], action.value);
    }

    default:
      return state;
  }
}
