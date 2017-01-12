import { createSelector } from 'reselect';

import { isSelectedConfigNameValid, getConfigsValidityMap, getIsAnyConfigValid } from './configs.validation';

const getNameClasses = createSelector(
  [isSelectedConfigNameValid],
  (isNameValid) => {
    return isNameValid ? '' : 'highlight';
  }
);

export const getConfigDecoration = createSelector(
  [getNameClasses],
  (nameClasses) => {
    return {
      nameClasses
    };
  }
);

export const getMenuDecorationClasses = createSelector(
  [getConfigsValidityMap],
  (configsValidityMap) => {
    let decorationMap = {};
    configsValidityMap.forEach(config => {
      decorationMap[config.id] = config.isValid ? 'valid' : 'invalid';
    });
    return decorationMap;
  }
);

export const getConfigsValidationMessage = createSelector(
  [getIsAnyConfigValid],
  (isAnyConfigValid) => {
    return isAnyConfigValid ? null : 'You have to add at least one valid configuration.';
  }
);
