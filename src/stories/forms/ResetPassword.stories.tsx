import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ResetPassword, ResetPasswordProps } from '../../containers/ResetPassword/ResetPassword';

export default {
  title: 'Forms/Reset password',
  component: ResetPassword,
} as Meta;

const Template: Story<ResetPasswordProps> = (args) => (
  <ResetPassword {...args} onSubmit={args.onSubmit} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (values) => {
    alert(values.email + values.password);
  },
};
