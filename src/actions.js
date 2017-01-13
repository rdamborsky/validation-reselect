import {
  LOAD_DESCRIPTORS_REQUEST, LOAD_DESCRIPTORS_SUCCESS, LOAD_DESCRIPTORS_FAILURE,
  CHANGE_APP_NAME,
  ADD_CONFIG, SELECT_CONFIG,
  CHANGE_CONFIG_NAME, CHANGE_CONFIG_DESCRIPTOR,
  CHECK_OWNER_REQUEST, CHECK_OWNER_SUCCESS, CHECK_OWNER_FAILURE
} from './actionTypes';

const mockLoadDescriptors = () => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        descriptors: [
          { id: 'd1', name: 'dev.json' },
          { id: 'd2', name: 'stage.json' },
          { id: 'd3', name: 'test.json' },
          { id: 'd4', name: 'production.json' }
        ]
      });
    }, 500);
  });
};

const mockCheckOwner = (email) => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        hasAccess: email === '' || email === 'bob@example.com'
      });
    }, 300);
  });
};

export function loadDescriptors() {
  return {
    types: [LOAD_DESCRIPTORS_REQUEST, LOAD_DESCRIPTORS_SUCCESS, LOAD_DESCRIPTORS_FAILURE],
    promise: mockLoadDescriptors()
  };
}

export function changeAppName(value) {
  return {
    type: CHANGE_APP_NAME,
    value
  };
}

export function addConfig() {
  return {
    type: ADD_CONFIG
  };
}

export function selectConfig(id) {
  return {
    type: SELECT_CONFIG,
    id
  };
}

export function changeConfigName(value) {
  return {
    type: CHANGE_CONFIG_NAME,
    value
  };
}

export function changeConfigDescriptor(value) {
  return {
    type: CHANGE_CONFIG_DESCRIPTOR,
    value
  };
}

export function changeConfigOwner(configId, value) {
  return {
    types: [CHECK_OWNER_REQUEST, CHECK_OWNER_SUCCESS, CHECK_OWNER_FAILURE],
    promise: mockCheckOwner(value),
    configId,
    value
  };
}
