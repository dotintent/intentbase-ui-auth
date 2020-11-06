import React, { FC } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { Field } from 'react-final-form';
import clsx from 'clsx';
import { MuiFormTextField } from './MuiFormTextField';

export interface FormInputProps extends BaseTextFieldProps {
  id: string;
  name: string;
  label: string;
  className?: string;
  startAdornment?: string | React.ReactNode;
  passwordPreview?: boolean;
}

export const FormInput: FC<FormInputProps> = ({ variant = 'outlined', className, ...rest }) => {
  return (
    <Field
      {...rest}
      className={clsx(className, 'form__input')}
      variant={variant}
      component={MuiFormTextField}
      fullWidth
    />
  );
};
