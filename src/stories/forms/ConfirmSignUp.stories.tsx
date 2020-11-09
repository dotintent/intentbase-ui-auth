import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ConfirmSignUp } from '../../containers/ConfirmSignUp/ConfirmSignUp';
import { FormWithDefaultsProps } from '../../components/Form/Form';

export default {
  title: 'Forms/Confirm Sign Up',
  component: ConfirmSignUp,
} as Meta;

export const Default: Story<FormWithDefaultsProps> = (args) => <ConfirmSignUp {...args} />;
