export const hasValidLength = (value: string, length = 8): boolean => value.length > length;
export const hasLetter = (value: string): boolean => /[a-zA-Z]/.test(value);
export const hasDigit = (value: string): boolean => /[0-9]/.test(value);
export const hasSpecialChar = (value: string): boolean => /[^A-Za-z0-9]/.test(value);
export const hasUppercaseLetter = (value: string): boolean => /[A-Z]/.test(value);
export const hasLowercaseLetter = (value: string): boolean => /[a-z]/.test(value);
export const hasNumber = (value: string): boolean => /\d/.test(value);

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean =>
  hasLetter(password) && hasDigit(password) && hasSpecialChar(password) && hasValidLength(password);

export const isChildrenRequired = (values: any, requiredChildren: Array<string>) => {
  const errors: any = {};
  requiredChildren.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export const defaultAuthValidation = (values: any, requiredChildren: Array<string>): any => {
  const errors: any = isChildrenRequired(values, requiredChildren);
  const requiredMessage = 'Required';

  if (!values.email) {
    errors.email = requiredMessage;
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email.';
  }

  if (!values.password) {
    errors.password = requiredMessage;
  } else if (!isValidPassword(values.password)) {
    errors.password =
      'Password must contain at least 8 characters, 1 letter, 1 number and 1 special character.';
  }

  return errors;
};
