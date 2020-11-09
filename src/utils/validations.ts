export const hasValidLength = (value: string, length = 8): boolean => value.length >= length;

export const hasLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[a-zA-Z]{${quantity}}`).test(value);

export const hasNumeric = (value: string, quantity = 1): boolean =>
  new RegExp(`[0-9]{${quantity}}`).test(value);

export const hasSpecialChar = (value: string, quantity = 1): boolean =>
  new RegExp(`[^A-Za-z0-9]{${quantity}}`).test(value);

export const hasUppercaseLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[A-Z]{${quantity}}`).test(value);

export const hasLowercaseLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[a-z]{${quantity}}`).test(value);

export const composeValidation = (...fns: Array<any>) => (value?: string): boolean =>
  fns.reduceRight((acc, fn) => [...acc, fn(value)], []).every(Boolean);

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isValidPassword = composeValidation(
  hasValidLength,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasNumeric,
  hasSpecialChar,
);

export const isChildrenRequired = (values: any, requiredChildren: Array<string>) => {
  const errors: any = {};
  requiredChildren.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export type DefaultAuthValidationOptions = Array<'email' | 'password' | 'code'>;

export const defaultAuthValidation = (
  values: any,
  requiredChildren: Array<string>,
  repeatPassword = false,
  validate: DefaultAuthValidationOptions,
): any => {
  const errors: any = isChildrenRequired(values, requiredChildren);
  const requiredMessage = 'Required';

  if (validate.includes('email')) {
    if (!values.email) {
      errors.email = requiredMessage;
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email.';
    }
  }

  if (validate.includes('password')) {
    if (!values.password) {
      errors.password = requiredMessage;
    } else if (!isValidPassword(values.password)) {
      errors.password =
        'Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character.';
    }

    if (repeatPassword && !values.passwordRepeat) {
      errors.passwordRepeat = requiredMessage;
    } else if (repeatPassword && values.password !== values.passwordRepeat) {
      errors.passwordRepeat = 'Password confirmation does not match.';
    }
  }

  if (validate.includes('code')) {
    if (!values.code) {
      errors.password = requiredMessage;
    }
  }

  return errors;
};
