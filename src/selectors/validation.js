import { createSelector } from 'reselect';

import { getSelectedConfigId } from './config';

export const getAccessFlags = (state) => state.validation.get('ownersAccessFlags');

export const hasAccess = (accessFlags, configId) => {
  const flag = accessFlags.get(configId);
  // either not checked yet (empty value), or result of the async verification
  return flag === undefined || flag;
};

export const hasSelectedConfigOwnerAccess = createSelector(
  [getSelectedConfigId, getAccessFlags],
  (configId, accessFlags) => {
    return hasAccess(accessFlags, configId);
  }
);
