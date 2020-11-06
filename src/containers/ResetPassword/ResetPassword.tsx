import React, { FC, useCallback, useEffect } from 'react';
import { PropTypes, Typography } from '@material-ui/core';
import { Form } from 'react-final-form';
import { ValidationErrors } from 'final-form';
import { useSafeSetState } from '../../hooks/useSafeSetState';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormButton } from '../../components/FormButton';
import {
  FormActionsContainer,
  FormInputsContainer,
  SubHeader,
} from '../../components/FormContainers.styled';
import { Header } from '../../components/Header';

export interface ResetPasswordProps {
  onSubmit: (values: any) => Promise<any>;
  title?: string | Element;
  titleAlign?: PropTypes.Alignment;
  resetPasswordButtonLabel?: string;
  codeLabel?: string;
  passwordLabel?: string;
  initialValues?: any;
  inputVariant?: 'filled' | 'outlined' | 'standard';
  onForgotPasswordClick?: () => void;
  validate?: (values: any) => ValidationErrors | Promise<ValidationErrors>;
  replacementValidate?: (values: any) => ValidationErrors | Promise<ValidationErrors>;
  loading?: boolean;
  autoFocus?: boolean;
  passwordPreview?: boolean;
  passwordRepeat?: boolean;
}

export const ResetPassword: FC<ResetPasswordProps> = ({
  onSubmit,
  validate,
  title = 'Reset your password',
  titleAlign = 'center',
  resetPasswordButtonLabel = 'Reset password',
  codeLabel = 'Code',
  passwordLabel = 'Password',
  initialValues = {},
  inputVariant = 'outlined',
  replacementValidate,
  loading = false,
  autoFocus = false,
  passwordPreview = true,
}) => {
  const [internalLoading, setInternalLoading] = useSafeSetState<boolean>(loading);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const onResetPassword = useCallback((values: any) => {
    setInternalLoading(true);
    return onSubmit(values)
      .then(() => {
        setInternalLoading(false);
      })
      .catch((error) => {
        setInternalLoading(false);
        return error;
      });
  }, []);

  const defaultValidate = useCallback((values: any) => {
    const errors: any = {};
    const requiredMessage = 'Required';

    if (!values.email) {
      errors.email = requiredMessage;
    }
    if (!values.code) {
      errors.code = requiredMessage;
    }

    return validate ? { ...errors, ...validate(values) } : errors;
  }, []);

  return (
    <div>
      <Header align={titleAlign}>{title}</Header>
      <SubHeader>
        <Typography variant="body1" align={titleAlign} gutterBottom>
          Please check your email for the ont-time code to rest your password.
        </Typography>
      </SubHeader>
      <Form
        onSubmit={onResetPassword}
        initialValues={initialValues}
        validate={replacementValidate || defaultValidate}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormInputsContainer>
              <FormInput
                autoFocus={autoFocus}
                id="code"
                name="code"
                required
                label={codeLabel}
                disabled={internalLoading}
                variant={inputVariant}
              />
              <FormInput
                id="password"
                name="password"
                type="password"
                required
                passwordPreview={passwordPreview}
                label={passwordLabel}
                disabled={internalLoading}
                variant={inputVariant}
              />
            </FormInputsContainer>
            <FormActionsContainer>
              <FormButton
                type="submit"
                loading={internalLoading}
                disabled={internalLoading || pristine}
                fullWidth
              >
                {resetPasswordButtonLabel}
              </FormButton>
            </FormActionsContainer>
          </form>
        )}
      />
    </div>
  );
};
