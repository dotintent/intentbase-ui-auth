import { IconButton, InputAdornment } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form';
import React, { FC, useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { StyledTextField } from './MuiFormTextField.styled';

type MuiFormTextFieldProps = FieldRenderProps<string, any>;

export const MuiFormTextField: FC<MuiFormTextFieldProps> = ({
  meta: { touched, error } = { touched: false, error: '' },
  input: { ...inputProps },
  startAdornment,
  passwordPreview,
  ...rest
}: MuiFormTextFieldProps) => {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked((prev) => !prev);
  };

  let inputStartAdornment;
  if (startAdornment) {
    inputStartAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (inputProps.type === 'password' && passwordPreview) {
    return (
      <StyledTextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...rest}
        type={passwordIsMasked ? 'password' : 'text'}
        InputProps={{
          startAdornment: inputStartAdornment,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={togglePasswordMask}
                onMouseDown={handleMouseDownPassword}
              >
                {passwordIsMasked ? <Visibility /> : <VisibilityOff color="primary" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  return (
    <StyledTextField
      error={!!(touched && error)}
      helperText={touched && error}
      InputProps={{
        startAdornment: inputStartAdornment,
      }}
      {...inputProps}
      {...rest}
    />
  );
};
