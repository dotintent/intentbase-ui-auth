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
import { useSafeSetState } from '../../hooks/useSafeSetState';
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

export interface SignUpProps {
  onSubmit: (values: any) => Promise<any>;
  title?: string | Element;
  titleAlign?: PropTypes.Alignment;
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
}

export const SignUp: FC<SignUpProps> = ({
  onSubmit,
  validate,
  title = 'Sign Up',
  titleAlign = 'center',
  signUpButtonLabel = 'Sign Up',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  initialValues = {},
  inputVariant = 'outlined',
  replacementValidate,
  loading = false,
  children,
}) => {
  const [internalLoading, setInternalLoading] = useSafeSetState<boolean>(loading);
  const [requiredChildren, setRequiredChildren] = useState<Array<string>>([]);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const defaultValidate = useCallback(
    (values: any) => {
      const errors: any = defaultAuthValidation(values, requiredChildren);
      return validate ? { ...errors, ...validate(values, requiredChildren) } : errors;
    },
    [requiredChildren, validate],
  );

  const signUp = useCallback((values: any) => {
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

  return (
    <div>
      <Header align={titleAlign}>{title}</Header>
      <SubHeader>
        <FormSectionTitle variant="h5" align={titleAlign} gutterBottom>
          Your Info
        </FormSectionTitle>
        <FormSectionSubtitle>
          <Typography variant="body1" align={titleAlign} gutterBottom>
            Have an Account?
          </Typography>
          &nbsp;
          <FormLink color="primary">Sign In</FormLink>
        </FormSectionSubtitle>
      </SubHeader>
      <Form
        onSubmit={signUp}
        initialValues={initialValues}
        validate={replacementValidate || defaultValidate}
        render={({ handleSubmit, pristine, errors }) => (
          <form onSubmit={handleSubmit}>
            <FormInputsContainer>
              <FormInput
                id="email"
                name="email"
                label={emailLabel}
                disabled={internalLoading}
                variant={inputVariant}
                required
              />
              <FormInput
                id="password"
                name="password"
                label={passwordLabel}
                disabled={internalLoading}
                variant={inputVariant}
                type="password"
                required
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
              <FormButton
                type="submit"
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
