import { authConstants } from '../constants/authConstants';

// Hardcoded user credentials (for demo)
const HARDCODED_USERS = [
  {
    id: 1,
    email: 'baraka@gmail.com',
    password: 'baraka',
    name: 'System Admin',
    role: 'admin',
    token: 'fake-jwt-token-admin-123',
  },
  {
    id: 2,
    email: 'mike@gmail.com',
    password: 'mike123',
    name: 'John Doe',
    role: 'user',
    token: 'fake-jwt-token-user-456',
  },
  {
    id: 3,
    email: 'neema@gmail.com',
    password: 'mwakagamba',
    name: 'System Admin',
    role: 'admin',
    token: 'fake-jwt-token-admin-123',
  },
  {
    id: 4,
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Jane Smith',
    role: 'manager',
    token: 'fake-jwt-token-manager-789',
  },
];

// Helper function to save to localStorage
const saveAuthToStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', userData.token);
};

// Helper function to clear from localStorage
const clearAuthFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Helper function to get from localStorage
const getAuthFromStorage = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return { user: user ? JSON.parse(user) : null, token };
};

// Action Creators
export const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Check hardcoded credentials
        const user = HARDCODED_USERS.find(
          u => u.email === email && u.password === password
        );
        
        if (user) {
          // Create user object without password
          const { password: _, ...userWithoutPassword } = user;
          
          // Save to localStorage
          saveAuthToStorage(userWithoutPassword);
          
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: userWithoutPassword
          });
          
          return Promise.resolve();
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: 'Invalid email or password'
          });
          
          return Promise.reject('Invalid email or password');
        }
      } catch (error) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: 'Login failed. Please try again.'
        });
        
        return Promise.reject('Login failed');
      }
    }, 1000); // Simulate 1 second delay
  };
};



export const logout = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    
    try {
      // Clear localStorage
      clearAuthFromStorage();
      
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: 'Logout failed'
      });
      
      return Promise.reject('Logout failed');
    }
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.CHECK_AUTH_REQUEST });
    
    try {
      const { user, token } = getAuthFromStorage();
      
      if (user && token) {
        dispatch({
          type: authConstants.CHECK_AUTH_SUCCESS,
          payload: user
        });
      } else {
        dispatch({
          type: authConstants.CHECK_AUTH_FAILURE,
          payload: 'Not authenticated'
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.CHECK_AUTH_FAILURE,
        payload: 'Authentication check failed'
      });
    }
  };
};

export const updateUser = (userData) => {
  return (dispatch) => {
    dispatch({ type: authConstants.UPDATE_USER_REQUEST });
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        if (!currentUser) {
          throw new Error('User not found');
        }
        
        // Update user data
        const updatedUser = { ...currentUser, ...userData };
        
        // Save to localStorage
        saveAuthToStorage(updatedUser);
        
        dispatch({
          type: authConstants.UPDATE_USER_SUCCESS,
          payload: updatedUser
        });
        
        return Promise.resolve();
      } catch (error) {
        dispatch({
          type: authConstants.UPDATE_USER_FAILURE,
          payload: 'Update failed'
        });

        
        return Promise.reject('Update failed');
      }
    }, 500);
  };
};

export const clearAuthErrors = () => {
  return (dispatch) => {
    dispatch({ type: authConstants.CLEAR_AUTH_ERRORS });
  };
};