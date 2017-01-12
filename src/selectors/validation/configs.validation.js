import { createSelector } from 'reselect';

import { getCurrentConfiguration, getConfigurations } from '../config';

// it is still ok to use pure functions
// you can also create a library of common validators (isNotEmpty, isEmail...)
const isNameValid = (name) => {
  return name.trim() !== '';
};

const isConfigValid = (config) => {
  return isNameValid(config.name);
};

export const isSelectedConfigNameValid = createSelector(
  [getCurrentConfiguration],
  (currentConfiguration) => {
    return currentConfiguration && isNameValid(currentConfiguration.name);
  }
);

export const getConfigsValidityMap = createSelector(
  [getConfigurations],
  (configurations) => {
    return configurations.map(config => {
      return {
        id: config.id,
        isValid: isConfigValid(config)
      };
    });
  }
);
