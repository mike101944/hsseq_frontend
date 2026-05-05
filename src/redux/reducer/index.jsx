import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

// You can add more reducers here as your app grows
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
  // users: usersReducer,
  // products: productsReducer,
});

export default rootReducer;