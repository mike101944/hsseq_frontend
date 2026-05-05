import { authConstants } from '../constants/authConstants';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login Cases
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
      
    // Logout Cases
    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
      
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    // Check Auth Cases
    case authConstants.CHECK_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case authConstants.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      
    case authConstants.CHECK_AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
      
    // Update User Cases
    case authConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case authConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
      
    case authConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    // Clear Errors
    case authConstants.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
      
    default:
      return state;
  }
};