import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();

import AppContainer from './containers/AppContainer';

render(
  <Provider store={ store }>
    <AppContainer/>
  </Provider>,
  document.getElementById('app')
);
