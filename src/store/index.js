import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from 'Reducers';

const store = (initialState = {}) => {
  const devtools = '__REDUX_DEVTOOLS_EXTENSION__';

  const store = typeof window === 'undefined' || !window[devtools] ? createStore(reducers, initialState, applyMiddleware(thunkMiddleware)) : createStore(reducers, initialState, compose(
    applyMiddleware(thunkMiddleware),
    window[devtools](),
  ));

  return store;
};

export default store;
