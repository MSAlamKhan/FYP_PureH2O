import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AuthReducer from './Reducers/AuthReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
export default store;