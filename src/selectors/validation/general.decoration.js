import { createSelector } from 'reselect';

import { isAppNameValid, isFormValid } from './general.validation';

const getAppNameClasses = createSelector(
  [isAppNameValid],
  (isValid) => {
    return isValid ? '' : 'highlight';
  }
);

export const getDecoration = createSelector(
  [getAppNameClasses, isFormValid],
  (appNameClasses, isValid) => {
    return {
      appNameClasses,
      isSubmitDisabled: !isValid
    };
  }
);
