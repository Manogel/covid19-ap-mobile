/* eslint-disable no-console */
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import persistConfig from './reduxPersist';
import sagas from './sagas';

const middlewares = [];
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      // eslint-disable-next-line no-console
      console.tron.createEnhancer()
    )
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composer);

sagaMiddleware.run(sagas);

const persistor = persistStore(store);

export { store, persistor };
