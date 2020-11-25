import React, { FC, useCallback, useState } from 'react';
import { Auth } from '@aws-amplify/auth';

import clsx from 'clsx';
import { Variant } from '@material-ui/core/styles/createTypography';
import { FormInput } from '../../components/FormInput/FormInput';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import * as MultiStep from '../../components/MultiStep/MultiStep';
import { ProgressBarPosition } from '../../components/MultiStep/MultiStep.styled';

interface ResetPasswordProps extends FormWithDefaultsProps {
  progressBarPosition?: ProgressBarPosition;
  sendEmailTitle?: string;
  sendEmailConfirmButtonLabel?: string;
  sendEmailSubheaderTitle?: string;
  sendEmailSubheaderVariant?: Variant;
  confirmCodeTitle?: string;
  confirmCodeConfirmButtonLabel?: string;
  confirmCodeSubheaderTitle?: string;
  confirmCodeSubheaderVariant?: Variant;
}

export const ResetPassword: FC<ResetPasswordProps> = ({
  onSubmitResult,
  title = 'Reset your password',
  titleAlign,
  emailLabel = 'Email',
  codeLabel = 'Code',
  passwordLabel = 'Password',
  autoFocus = false,
  passwordPreview = true,
  className,
  progressBarPosition = 'bottom',
  sendEmailTitle = 'Send Email',
  sendEmailConfirmButtonLabel = 'Send me a one-time code',
  sendEmailSubheaderTitle = 'If the email address matches one in our records, we’ll send a one-time code to reset your password.',
  sendEmailSubheaderVariant = 'body1',
  confirmCodeTitle = 'Reset your password',
  confirmCodeConfirmButtonLabel = 'Reset password',
  confirmCodeSubheaderTitle = 'Please check your email for the one-time code to reset your password.',
  confirmCodeSubheaderVariant = 'body1',
  ...rest
}) => {
  const [sentEmail, setSentEmail] = useState<string | undefined>(undefined);

  const onSendEmailResetPassword = useCallback(async ({ email }): Promise<string> => {
    await Auth.forgotPassword(email);
    onSubmitResult && (await onSubmitResult({}));
    setSentEmail(email);
    return 'done';
  }, []);

  const onResetPassword = useCallback(async ({ code, password }): Promise<string> => {
    if (!sentEmail) {
      return 'err';
    }
    Auth.forgotPasswordSubmit(sentEmail, code, password);
    onSubmitResult && (await onSubmitResult({}));
    return 'done';
  }, []);

  return (
    <MultiStep.Wizard
      title={title}
      titleAlign={titleAlign}
      progressBarPosition={progressBarPosition}
      className={clsx(className, 'resetPassword')}
    >
      <MultiStep.Page title={sendEmailTitle} shouldMoveNext={Boolean(sentEmail)}>
        <Form
          onSubmit={onSendEmailResetPassword}
          defaultValidationFields={['email']}
          confirmButtonLabel={sendEmailConfirmButtonLabel}
          className={clsx(className, 'resetPassword--sendEmail')}
          subheaderTitle={sendEmailSubheaderTitle}
          subheaderTitleVariant={sendEmailSubheaderVariant}
          {...rest}
        >
          <FormInput autoFocus={autoFocus} source="email" required label={emailLabel} />
        </Form>
      </MultiStep.Page>
      <MultiStep.Page title={confirmCodeTitle}>
        <Form
          onSubmit={onResetPassword}
          defaultValidationFields={['code', 'password']}
          confirmButtonLabel={confirmCodeConfirmButtonLabel}
          className={clsx(className, 'resetPassword--confirmCode')}
          subheaderTitle={confirmCodeSubheaderTitle}
          subheaderTitleVariant={confirmCodeSubheaderVariant}
          {...rest}
        >
          <FormInput autoFocus={autoFocus} source="code" required label={codeLabel} />
          <FormInput
            source="password"
            label={passwordLabel}
            passwordPreview={passwordPreview}
            required
            repeat
          />
        </Form>
      </MultiStep.Page>
      <MultiStep.ProgressBar clickable />
    </MultiStep.Wizard>
  );
};
