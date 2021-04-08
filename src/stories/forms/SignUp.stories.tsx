import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SignUp, SignUpProps } from '../../containers/SignUp/SignUp';
import { FormInput } from '../../components/FormInput/FormInput';

export default {
  title: 'Forms/Sign Up',
  component: SignUp,
} as Meta;

export const Default: Story<SignUpProps> = (args) => <SignUp {...args} />;

export const CustomFields: Story<SignUpProps> = (args) => (
  <SignUp {...args}>
    <FormInput source="firstName" />
    <FormInput source="lastName" required />
  </SignUp>
);
