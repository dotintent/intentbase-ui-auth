import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ResetPassword } from '../../containers/ResetPassword/ResetPassword';
import { FormWithDefaultsProps } from '../../components/Form/Form';

export default {
  title: 'Forms/Reset password',
  component: ResetPassword,
} as Meta;

export const Default: Story<FormWithDefaultsProps> = (args) => <ResetPassword {...args} />;
