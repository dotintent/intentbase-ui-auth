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
import { Form as FinalForm } from 'react-final-form';
import { ValidationErrors } from 'final-form';
import clsx from 'clsx';
import { Variant } from '@material-ui/core/styles/createTypography';
import { FormButton } from '../FormButton';
import {
  FormActionsContainer,
  FormInputsContainer,
  FormSubheaderContent,
  FormSubheaderTitle,
  SubHeader,
} from './Form.styled';
import { Header } from '../Header';
import { defaultAuthValidation, DefaultAuthValidationOptions } from '../../utils/validations';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { CognitoError } from '../../common/interfaces/CognitoError';
import { useSnackbar } from '../SnackbarProvider';
import { useSafeSetState } from '../../hooks/useSafeSetState';

export interface FormProps {
  onSubmit?: (values: any) => Promise<string>;
  onSubmitResult?: (values: any) => Promise<void>;
  title?: string;
  titleAlign?: PropTypes.Alignment;
  autoFocus?: boolean;
  onSuccessLoginMsg?: string;
  initialValues?: any;
  inputVariant?: 'filled' | 'outlined' | 'standard';
  defaultValidationFields: DefaultAuthValidationOptions;
  validate?: (
    values: any,
    requiredChildren: Array<string>,
  ) => ValidationErrors | Promise<ValidationErrors>;
  replacementValidate?: (values: any) => ValidationErrors | Promise<ValidationErrors>;
  loading?: boolean;
  className?: string;
  confirmButtonLabel: string;
  subheaderTitle?: string;
  subheaderTitleVariant?: Variant;
  subheaderContent?: string | JSX.Element;
  formActionsBeforeConfirm?: JSX.Element;
  formActionsAfterConfirm?: JSX.Element;
}

export interface FormWithDefaultsProps extends FormProps {
  codeLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  passwordPreview?: boolean;
  passwordRepeat?: boolean;
}

export interface FormActionsProps {
  values?: any;
  loading?: boolean;
}

export const Form: FC<FormProps> = ({
  onSubmit,
  title,
  titleAlign = 'center',
  initialValues = {},
  inputVariant = 'outlined',
  defaultValidationFields,
  validate,
  replacementValidate,
  loading = false,
  className,
  children,
  confirmButtonLabel,
  subheaderTitle,
  subheaderTitleVariant = 'h5',
  subheaderContent,
  formActionsBeforeConfirm,
  formActionsAfterConfirm,
}) => {
  const [internalLoading, setInternalLoading] = useSafeSetState<boolean>(loading);
  const [requiredChildren, setRequiredChildren] = useState<Array<string>>([]);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  const handleOnSubmit = useCallback((values) => {
    setInternalLoading(true);
    return (
      onSubmit &&
      onSubmit(values)
        .then(async (message) => {
          setInternalLoading(false);
          showSnackbar({ message, severity: 'success' });
        })
        .catch(({ message }: CognitoError) => {
          setInternalLoading(false);
          showSnackbar({ message, severity: 'error' });
        })
    );
  }, []);

  const defaultValidate = useCallback(
    (values: any) => {
      const errors: any = defaultAuthValidation(
        values,
        requiredChildren,
        false,
        defaultValidationFields,
      );
      return validate ? { ...errors, ...validate(values, requiredChildren) } : errors;
    },
    [requiredChildren, validate],
  );

  return (
    <div className={clsx(className, 'form')}>
      {title && (
        <Header className="form__header" align={titleAlign}>
          {title}
        </Header>
      )}
      {(subheaderTitle || subheaderContent) && (
        <SubHeader className="form__subheader">
          {subheaderTitle && (
            <FormSubheaderTitle
              className="form__subheader__title"
              variant={subheaderTitleVariant}
              gutterBottom
            >
              {subheaderTitle}
            </FormSubheaderTitle>
          )}
          {subheaderContent && (
            <FormSubheaderContent className="form__subheader__content">
              {subheaderContent}
            </FormSubheaderContent>
          )}
        </SubHeader>
      )}
      <FinalForm
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        validate={replacementValidate || defaultValidate}
        render={({ handleSubmit, pristine, errors, values }) => (
          <form onSubmit={handleSubmit} className="form__container">
            <FormInputsContainer className="form__container__inputs">
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  const { props } = child;
                  if (props.required) {
                    setRequiredChildren((prevState) => {
                      prevState.push(props.id || props.source);
                      return prevState;
                    });
                  }
                  return cloneElement(
                    child,
                    {
                      loading: internalLoading,
                      variant: inputVariant,
                    },
                    null,
                  );
                }
                return child;
              })}
            </FormInputsContainer>
            <FormActionsContainer className="form__container__actions">
              {formActionsBeforeConfirm &&
                cloneElement(formActionsBeforeConfirm, {
                  loading: internalLoading,
                  values,
                })}
              <FormButton
                type="submit"
                className="form__action__btn--submit"
                loading={internalLoading}
                disabled={internalLoading || pristine || !isObjectEmpty(errors)}
                fullWidth
              >
                {confirmButtonLabel}
              </FormButton>
              {formActionsAfterConfirm &&
                cloneElement(formActionsAfterConfirm, {
                  loading: internalLoading,
                  values,
                })}
            </FormActionsContainer>
          </form>
        )}
      />
    </div>
  );
};
