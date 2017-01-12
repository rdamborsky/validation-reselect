import { createSelector } from 'reselect';

import { getCurrentConfiguration } from '../config';

// it is still ok to use pure functions
// you can also create a library of common validators (isNotEmpty, isEmail...)
const isNameValid = (name) => {
  return name.trim() !== '';
};

export const isSelectedConfigNameValid = createSelector(
  [getCurrentConfiguration],
  (currentConfiguration) => {
    return currentConfiguration && isNameValid(currentConfiguration.name);
  }
);
