import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ConfirmSignUp, ConfirmSignUpProps } from '../../containers/ConfirmSignUp/ConfirmSignUp';

export default {
  title: 'Forms/Confirm Sign Up',
  component: ConfirmSignUp,
} as Meta;

export const Default: Story<ConfirmSignUpProps> = (args) => <ConfirmSignUp {...args} />;
