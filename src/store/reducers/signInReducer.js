const initialState = {
  username: '',
  password: '',
  usernameErr: '',
  passwordErr: '',
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return { ...state, username: action.value };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.value };
    case 'CHANGE_USERNAME_ERROR':
      return { ...state, usernameErr: action.value };
    case 'CHANGE_PASSWORD_ERROR':
      return { ...state, passwordErr: action.value };
    default:
      return state;
  }
};

export default signInReducer;
