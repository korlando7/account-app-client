export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

  return re.test(username);
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return ({ valid: false, message: 'password must be at least 6 characters' });
  }

  let re = /[a-z]/;
  if (!re.test(password)) {
    return ({ valid: false, message: 'password must contain at least one lower case letter' });
  }

  re = /[A-Z]/;
  if (!re.test(password)) {
    return ({ valid: false, message: 'password must contain at least one upper case letter' });
  }

  re = /[0-9]/;
  if (!re.test(password)) {
    return ({ valid: false, message: 'password must contain at least one number' });
  }

  re = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
  if (!re.test(password)) {
    return ({ valid: false, message: 'password must contain at least one special character' });
  }

  return ({ valid: true });
};
