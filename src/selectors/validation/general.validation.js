import { createSelector } from 'reselect';

import { getAppName } from '../general';

export const isAppNameValid = createSelector(
  [getAppName],
  (appName) => {
    return appName.trim() !== '';
  }
);
