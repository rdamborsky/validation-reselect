import { createSelector } from 'reselect';

const findConfigs = state => state.formValues.get('configs');
const findDescriptors = state => state.formValues.get('descriptors');
const getSelectedConfigId = state => state.formValues.get('selectedConfigId');

export const getConfigurations = createSelector(
  [findConfigs],
  (configs) => {
    return configs.toList().toJS();
  }
);

export const getCurrentConfiguration = createSelector(
  [findConfigs, getSelectedConfigId],
  (configs, selectedConfigId) => {
    const config = configs.get(selectedConfigId);
    return config ? config.toJS() : null;
  }
);

export const getDescriptors = createSelector(
  [findDescriptors],
  (descriptors) => {
    return descriptors.toList().toJS();
  }
);
