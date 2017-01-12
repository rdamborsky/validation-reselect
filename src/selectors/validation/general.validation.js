import { createSelector } from 'reselect';

import { getAppName } from '../general';
import { getIsAnyConfigValid } from './configs.validation';

export const isAppNameValid = createSelector(
  [getAppName],
  (appName) => {
    return appName.trim() !== '';
  }
);

export const isFormValid = createSelector(
  [isAppNameValid, getIsAnyConfigValid],
  (isNameValid, isConfigValid) => {
    return isNameValid && isConfigValid;
  }
);
