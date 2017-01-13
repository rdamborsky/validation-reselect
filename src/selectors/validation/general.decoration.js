import { createSelector } from 'reselect';

import { isAppNameValid, isFormValid } from './general.validation';
import { getIsAnyConfigValid } from './configs.validation';
import { getInvalidFieldsCount } from './configs.decoration';
import { getSelectedConfigId } from '../config';

const getAppNameClasses = createSelector(
  [isAppNameValid],
  (isValid) => {
    return isValid ? '' : 'highlight';
  }
);

const getFooterMessage = createSelector(
  [isAppNameValid, getIsAnyConfigValid, getSelectedConfigId, getInvalidFieldsCount],
  (isNameValid, isAnyConfigValid, selectedConfigId, invalidConfigFieldsCount) => {
    let missing = '';
    const shouldCountConfig = !!selectedConfigId;
    const missingCount = (isNameValid ? 0 : 1) + (shouldCountConfig ? invalidConfigFieldsCount : 0);
    if (missingCount > 0) {
      missing = `${missingCount} field${missingCount === 1 ? '' : 's'} missing`;
    }
    let configs = '';
    if (!selectedConfigId) {
      configs = 'no configuration set';
    }
    if (selectedConfigId && !isAnyConfigValid) {
      configs = 'at least one config has to be valid';
    }
    return `${missing}${missing && configs ? ', ' : ''}${configs}`;
  }
);

export const getDecoration = createSelector(
  [getAppNameClasses, isFormValid, getFooterMessage],
  (appNameClasses, isValid, footerMessage) => {
    return {
      appNameClasses,
      footerMessage,
      isSubmitDisabled: !isValid
    };
  }
);
