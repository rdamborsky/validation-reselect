import { createSelector } from 'reselect';

import { isSelectedConfigNameValid } from './configs.validation';

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
