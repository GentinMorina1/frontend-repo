const initialState = {
    user: null,
    role: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          role: action.payload.role
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  