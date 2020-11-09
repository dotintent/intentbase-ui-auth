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
import clsx from 'clsx';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormButton } from '../../components/FormButton';
import {
  FormActionsContainer,
  FormInputsContainer,
  FormLink,
  FormSectionSubtitle,
  FormSectionTitle,
  SubHeader,
} from '../../components/FormContainers.styled';
import { Header } from '../../components/Header';
import { defaultAuthValidation } from '../../utils/validations';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { useSnackbar } from '../../components/SnackbarProvider';
import { useSafeSetState } from '../../hooks/useSafeSetState';

export interface SignUpProps {
  onSubmit: (values: any) => Promise<any>;
  title?: string | Element;
  titleAlign?: PropTypes.Alignment;
  subtitle?: string | Element;
  actionSectionText?: string;
  onClickSignIn?: () => void;
  signUpButtonLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  initialValues?: any;
  inputVariant?: 'filled' | 'outlined' | 'standard';
  validate?: (
    values: any,
    requiredChildren: Array<string>,
  ) => ValidationErrors | Promise<ValidationErrors>;
  replacementValidate?: (values: any) => ValidationErrors | Promise<ValidationErrors>;
  loading?: boolean;
  autoFocus?: boolean;
  passwordPreview?: boolean;
  className?: string;
}

export const SignUp: FC<SignUpProps> = ({
  onSubmit,
  validate,
  className,
  title = 'Sign Up',
  titleAlign = 'center',
  subtitle = 'Your Info',
  actionSectionText = 'Have an Account?',
  onClickSignIn,
  signUpButtonLabel = 'Sign Up',
  emailLabel = 'Email',
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

  const defaultValidate = useCallback(
    (values: any) => {
      const errors: any = defaultAuthValidation(values, requiredChildren, true);
      return validate ? { ...errors, ...validate(values, requiredChildren) } : errors;
    },
    [requiredChildren, validate],
  );

  const signUp = useCallback((values: any) => {
    setInternalLoading(true);
    return onSubmit(values)
      .then(() => {
        setInternalLoading(false);
        showSnackbar({ message: 'Successful registration.', severity: 'success' });
      })
      .catch((error) => {
        setInternalLoading(false);
        showSnackbar({ message: error, severity: 'error' });
      });
  }, []);

  return (
    <div className={clsx(className, 'signUp')}>
      <Header className="signUp__header--title" align={titleAlign}>
        {title}
      </Header>
      <SubHeader className="signUp__subheader">
        <FormSectionTitle className="signUp__subheader--title" variant="h5" gutterBottom>
          {subtitle}
        </FormSectionTitle>
        <FormSectionSubtitle className="signUp__subheader__section">
          <Typography variant="body1" gutterBottom className="signUp__subheader__section--text">
            {actionSectionText}
          </Typography>
          &nbsp;
          {onClickSignIn && (
            <FormLink color="primary" className="signUp__subheader__section--link">
              Sign In
            </FormLink>
          )}
        </FormSectionSubtitle>
      </SubHeader>
      <Form
        onSubmit={signUp}
        initialValues={initialValues}
        validate={replacementValidate || defaultValidate}
        render={({ handleSubmit, pristine, errors }) => (
          <form onSubmit={handleSubmit} className="signUp__form">
            <FormInputsContainer className="signUp__form__inputs">
              <FormInput
                autoFocus={autoFocus}
                source="email"
                label={emailLabel}
                disabled={internalLoading}
                variant={inputVariant}
                required
              />
              <FormInput
                source="password"
                label={passwordLabel}
                passwordPreview={passwordPreview}
                disabled={internalLoading}
                variant={inputVariant}
                required
                repeat
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
            <FormActionsContainer className="signUp__form__actions">
              <FormButton
                type="submit"
                className="signUp__form__btn--submit"
                loading={internalLoading}
                disabled={internalLoading || pristine || !isObjectEmpty(errors)}
                fullWidth
              >
                {signUpButtonLabel}
              </FormButton>
            </FormActionsContainer>
          </form>
        )}
      />
    </div>
  );
};
