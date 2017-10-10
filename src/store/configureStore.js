/**
 *
 * @flow
 */

'use strict';

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/sagas/'


var promise = require('./promise');
var array = require('./array');
var analytics = require('./analytics');
var reducers = require('../reducers');
var { AsyncStorage } = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


const customCompose  = (__DEV__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const sagaMiddleware = createSagaMiddleware();

function configureStore(onComplete: ?() => void) {
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker

  const store = createStore(
    reducers,
    undefined,
    customCompose(
      applyMiddleware(thunk, promise, array, analytics, sagaMiddleware),
      autoRehydrate()
    )
  )
  persistStore(store, { storage: AsyncStorage }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  
  if(module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  sagaMiddleware.run(rootSaga);
  return store;

}
module.exports = configureStore;
