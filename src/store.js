import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import apiMiddleware from './middlewares/api';

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger();

  const middlewares = [
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    apiMiddleware,
    loggerMiddleware
  ];

  const composedMiddlewares = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, initialState, composedMiddlewares);

  if (module.hot) {
    module.hot.accept('./reducers/root', () => {
      const nextReducer = require('./reducers/root').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
