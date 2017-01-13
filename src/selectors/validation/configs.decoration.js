import { createSelector } from 'reselect';

import { isSelectedConfigNameValid, getConfigsValidityMap, getIsAnyConfigValid } from './configs.validation';
import { hasSelectedConfigOwnerAccess } from '../validation';

const getNameClasses = createSelector(
  [isSelectedConfigNameValid],
  (isNameValid) => {
    return isNameValid ? '' : 'highlight';
  }
);

const getIsCheckingOwner = state => state.validation.get('isCheckingOwner');
const getOwnerClasses = createSelector(
  [hasSelectedConfigOwnerAccess],
  (hasAccess) => {
    return hasAccess ? '' : 'highlight';
  }
);

export const getConfigDecoration = createSelector(
  [getNameClasses, getIsCheckingOwner, getOwnerClasses],
  (nameClasses, isCheckingOwner, ownerClasses) => {
    return {
      nameClasses,
      isCheckingOwner,
      ownerClasses
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

export const getInvalidFieldsCount = createSelector(
  [isSelectedConfigNameValid, hasSelectedConfigOwnerAccess],
  (isNameValid, hasOwnerAccess) => {
    return (isNameValid ? 0 : 1) + (hasOwnerAccess ? 0 : 1);
  }
);
