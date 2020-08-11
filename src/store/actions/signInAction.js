export const changeUsername = (value) => {
  return {
    type: 'CHANGE_USERNAME',
    value,
  };
};

export const changePassword = (value) => {
  return {
    type: 'CHANGE_PASSWORD',
    value,
  };
};

export const changeUsernameErr = (value) => {
  return {
    type: 'CHANGE_USERNAME_ERROR',
    value,
  };
};

export const changePasswordErr = (value) => {
  return {
    type: 'CHANGE_PASSWORD_ERROR',
    value,
  };
};

export const setToInitial = () => {
  return {
    type: 'SET_TO_INITIAL',
  };
};
