import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from '../../../less7/src/Reducers/node_modules/connected-react-router';
import { persistStore, persistReducer } from '../../../less7/src/utils/node_modules/redux-persist';
import storage from '../../../less7/src/utils/node_modules/redux-persist/lib/storage';
import autoMergeLevel2 from '../../../less7/src/utils/node_modules/redux-persist/lib/stateReconciler/autoMergeLevel2';
import initReducers from '../Reducers';
import middleware from '../middlewares';

const persistConfig = {
  key: 'geekmessanger',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['messageReducer', 'chatReducer'],
};

export const history = createBrowserHistory();

export default () => {
  const innitialStore = {};

  const store = createStore(
    persistReducer(persistConfig, initReducers(history)),
    innitialStore,
    compose(
      applyMiddleware(routerMiddleware(history), ...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
    ),
  );

  const persistor = persistStore(store);

  return { store, persistor };
};