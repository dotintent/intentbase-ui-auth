import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ConfirmSignUpProps, ConfirmSignUp } from '../../containers/ConfirmSignUp/ConfirmSignUp';

export default {
  title: 'Forms/Confirm Sign Up',
  component: ConfirmSignUp,
} as Meta;

const Template: Story<ConfirmSignUpProps> = (args) => (
  <ConfirmSignUp {...args} onSubmit={args.onSubmit} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (values) => {
    alert(values.email + values.password);
  },
};
