import { createSelector } from 'reselect';

import { isAppNameValid } from './general.validation';

const getAppNameClasses = createSelector(
  [isAppNameValid],
  (isValid) => {
    return isValid ? '' : 'highlight';
  }
);

export const getDecoration = createSelector(
  [getAppNameClasses],
  (appNameClasses) => {
    return {
      appNameClasses
    };
  }
);
