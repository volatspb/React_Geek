import { combineReducers } from 'redux';
import { connectRouter } from '../../../less7/src/Reducers/node_modules/connected-react-router';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

export default history => combineReducers({
  router: connectRouter(history),
  chatReducer,
  messageReducer,
});