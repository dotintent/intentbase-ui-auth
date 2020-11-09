import React, { FC } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { Field } from 'react-final-form';
import clsx from 'clsx';
import { MuiFormTextField } from './MuiFormTextField';

export interface FormInputProps extends BaseTextFieldProps {
  id?: string;
  name?: string;
  source: string;
  label?: string;
  className?: string;
  startAdornment?: string | React.ReactNode;
  passwordPreview?: boolean;
  repeat?: boolean;
  repeatId?: string;
  repeatName?: string;
  repeatSource?: string;
  repeatLabel?: string;
  repeatClassName?: string;
  repeatStartAdornment?: string | React.ReactNode;
  repeatPasswordPreview?: boolean;
}

const getLabelFromSource = (source: string): string => {
  return source
    .split(/(?=[A-Z])/)
    .map((str, index) => {
      if (index === 0) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
      }
      return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
    })
    .join(' ');
};

export const FormInput: FC<FormInputProps> = ({
  variant = 'outlined',
  className,
  source,
  id,
  name,
  label,
  type,
  repeat = false,
  repeatId,
  repeatName,
  repeatSource,
  repeatLabel,
  repeatClassName,
  ...rest
}) => {
  const idInternal = id || source;
  const nameInternal = name || source;
  const labelInternal = label || getLabelFromSource(source);
  const typeInternal = type || source === 'password' ? 'password' : undefined;

  const sourceRepeatInternal = repeatSource || `${source}Repeat`;
  const idRepeatInternal = repeatId || sourceRepeatInternal;
  const nameRepeatInternal = repeatName || sourceRepeatInternal;
  const labelRepeatInternal = repeatLabel || getLabelFromSource(sourceRepeatInternal);
  const typeRepeatInternal = type || source === 'password' ? 'password' : undefined;

  if (repeat) {
    return (
      <>
        <Field
          {...rest}
          id={idInternal}
          name={nameInternal}
          label={labelInternal}
          type={typeInternal}
          className={clsx(className, 'form__input')}
          variant={variant}
          component={MuiFormTextField}
          fullWidth
        />
        <Field
          {...rest}
          id={idRepeatInternal}
          name={nameRepeatInternal}
          label={labelRepeatInternal}
          type={typeRepeatInternal}
          className={clsx(repeatClassName, 'form__input')}
          variant={variant}
          component={MuiFormTextField}
          fullWidth
        />
      </>
    );
  }

  return (
    <Field
      {...rest}
      id={idInternal}
      name={nameInternal}
      label={labelInternal}
      type={typeInternal}
      className={clsx(className, 'form__input')}
      variant={variant}
      component={MuiFormTextField}
      fullWidth
    />
  );
};
