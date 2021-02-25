import './css/styles.css';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from '../../less7/src/Reducers/node_modules/connected-react-router';
import { PersistGate } from '../../less7/src/node_modules/redux-persist/integration/react';
import Router from './Containers/Router';
import { store, persistor, history } from './utils';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}