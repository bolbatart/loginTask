import signInReducer from './signInReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  signInReducer,
  // other reducers if they will be created in the future
});

export default rootReducer;
