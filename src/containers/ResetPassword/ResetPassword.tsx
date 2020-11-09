import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PropTypes, Typography } from '@material-ui/core';
import { Form } from 'react-final-form';
import { ValidationErrors } from 'final-form';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormButton } from '../../components/FormButton';
import {
  FormActionsContainer,
  FormInputsContainer,
  SubHeader,
} from '../../components/FormContainers.styled';
import { Header } from '../../components/Header';
import { useSnackbar } from '../../components/SnackbarProvider';
import { useSafeSetState } from '../../hooks/useSafeSetState';
import { defaultAuthValidation } from '../../utils/validations';

export interface ResetPasswordProps {
  onSubmit: (values: any) => Promise<any>;
  title?: string | Element;
  titleAlign?: PropTypes.Alignment;
  subtitle?: string | Element;
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
  subtitle = 'Please check your email for the ont-time code to rest your password.',
  resetPasswordButtonLabel = 'Reset password',
  codeLabel = 'Code',
  passwordLabel = 'Password',
  initialValues = {},
  inputVariant = 'outlined',
  replacementValidate,
  loading = false,
  autoFocus = false,
  passwordPreview = true,
  children,
}) => {
  const [internalLoading, setInternalLoading] = useSafeSetState<boolean>(loading);
  const [requiredChildren, setRequiredChildren] = useState<Array<string>>([]);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const onResetPassword = useCallback((values: any) => {
    setInternalLoading(true);
    return onSubmit(values)
      .then(() => {
        setInternalLoading(false);
        showSnackbar({ message: 'Lorem ipsum', severity: 'success' });
      })
      .catch((error) => {
        setInternalLoading(false);
        showSnackbar({ message: error, severity: 'error' });
      });
  }, []);

  const defaultValidate = useCallback((values: any) => {
    const errors: any = defaultAuthValidation(values, requiredChildren, false, [
      'password',
      'code',
    ]);
    return validate ? { ...errors, ...validate(values) } : errors;
  }, []);

  return (
    <div>
      <Header align={titleAlign}>{title}</Header>
      <SubHeader>
        <Typography variant="body1" gutterBottom>
          {subtitle}
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
                source="code"
                required
                label={codeLabel}
                disabled={internalLoading}
                variant={inputVariant}
              />
              <FormInput
                source="password"
                required
                passwordPreview={passwordPreview}
                label={passwordLabel}
                disabled={internalLoading}
                variant={inputVariant}
              />
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  const { props } = child;
                  if (props.required) {
                    setRequiredChildren((prevState) => {
                      prevState.push(props.id || props.source);
                      return prevState;
                    });
                  }
                  return cloneElement(child, {}, null);
                }
                return child;
              })}
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
