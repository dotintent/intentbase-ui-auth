import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PropTypes } from '@material-ui/core';
import { Form } from 'react-final-form';
import { ValidationErrors } from 'final-form';
import { Auth } from 'aws-amplify';
import { useSafeSetState } from '../../hooks/useSafeSetState';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormButton } from '../../components/FormButton';
import { FormActionsContainer, FormInputsContainer } from '../../components/FormContainers.styled';
import { Header } from '../../components/Header';
import { defaultAuthValidation } from '../../utils/validations';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { CognitoUser } from '../../hooks/useUser';
import { CognitoError } from '../../common/interfaces/CognitoError';
import { StyledForgotPassword } from './SignIn.styled';

export interface SignInProps {
  onSubmit: (values: any) => Promise<any>;
  title?: string | Element;
  titleAlign?: PropTypes.Alignment;
  forgotPasswordLabel?: string;
  signInButtonLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  initialValues?: any;
  inputVariant?: 'filled' | 'outlined' | 'standard';
  onForgotPasswordClick?: () => void;
  validate?: (
    values: any,
    requiredChildren: Array<string>,
  ) => ValidationErrors | Promise<ValidationErrors>;
  replacementValidate?: (values: any) => ValidationErrors | Promise<ValidationErrors>;
  loading?: boolean;
  autoFocus?: boolean;
  passwordPreview?: boolean;
}

export const SignIn: FC<SignInProps> = ({
  onSubmit,
  validate,
  title = 'Sign In',
  titleAlign = 'center',
  forgotPasswordLabel = 'Forgot password',
  signInButtonLabel = 'Sign In',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  onForgotPasswordClick,
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
  const [cognitoUser, setCognitoUser] = useState<CognitoUser>();
  const [cognitoUserSession, setCognitoUserSession] = useState<CognitoUser>();
  const [cognitoError, setCognitoError] = useState<string>();
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(
    'L:71 | cognitoError, cognitoUser, cognitoUserSession, loggedIn: ',
    cognitoError,
    cognitoUser,
    cognitoUserSession,
    loggedIn,
  );

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const signIn = useCallback((values) => {
    setInternalLoading(true);
    console.log('test');
    return Auth.signIn({
      username: values.email,
      password: values.password,
    })
      .then(async (user) => {
        setCognitoUser(user);
        setCognitoUserSession(user.signInUserSession);
        setLoggedIn(true);
        await onSubmit(values);
        setInternalLoading(false);
        return true;
      })
      .catch((error: CognitoError) => {
        console.log('L:91 | error: ', error);
        setCognitoError(error.message);
        setInternalLoading(false);
      });
  }, []);

  const defaultValidate = useCallback(
    (values: any) => {
      const errors: any = defaultAuthValidation(values, requiredChildren);
      return validate ? { ...errors, ...validate(values, requiredChildren) } : errors;
    },
    [requiredChildren, validate],
  );

  return (
    <div>
      <Header align={titleAlign}>{title}</Header>
      <Form
        onSubmit={signIn}
        initialValues={initialValues}
        validate={replacementValidate || defaultValidate}
        render={({ handleSubmit, pristine, errors }) => (
          <form onSubmit={handleSubmit}>
            <FormInputsContainer>
              <FormInput
                autoFocus={autoFocus}
                id="email"
                name="email"
                required
                label={emailLabel}
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
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  const { props } = child;
                  if (props.required) {
                    setRequiredChildren((prevState) => {
                      prevState.push(props.id);
                      return prevState;
                    });
                  }
                  return cloneElement(child, {}, null);
                }
                return child;
              })}
            </FormInputsContainer>
            <FormActionsContainer>
              {onForgotPasswordClick && (
                <StyledForgotPassword
                  color="primary"
                  variant="body1"
                  onClick={onForgotPasswordClick}
                >
                  {forgotPasswordLabel}
                </StyledForgotPassword>
              )}
              <FormButton
                type="submit"
                loading={internalLoading}
                disabled={internalLoading || pristine || !isObjectEmpty(errors)}
                fullWidth
              >
                {signInButtonLabel}
              </FormButton>
            </FormActionsContainer>
          </form>
        )}
      />
    </div>
  );
};
