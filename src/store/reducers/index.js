import signInReducer from './signInReducer';
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signInReducer'],
};

// const rootReducer = combineReducers({
//   signInReducer: persistReducer(persistConfig, signInReducer),
//   // other reducers if they will be created in the future
// });

// export default rootReducer;

const rootReducer = combineReducers({
  signInReducer,
});

export default persistReducer(persistConfig, rootReducer);
