import { combineReducers } from 'redux';

import formValues from './formValues';
import validation from './validation';

const rootReducer = combineReducers({
  formValues,
  validation
});

export default rootReducer;
