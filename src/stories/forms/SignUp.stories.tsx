import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SignUp, SignUpProps } from '../../containers/SignUp/SignUp';
import { FormInput } from '../../components/FormInput/FormInput';

export default {
  title: 'Forms/Sign Up',
  component: SignUp,
} as Meta;

const Template: Story<SignUpProps> = (args) => <SignUp {...args} onSubmit={args.onSubmit} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (values) => console.log(values),
};

const TemplateCustomFields: Story<SignUpProps> = (args) => (
  <SignUp {...args} onSubmit={args.onSubmit}>
    <FormInput source="firstName" />
    <FormInput source="lastName" required />
  </SignUp>
);

export const CustomFields = TemplateCustomFields.bind({});
CustomFields.args = {
  onSubmit: async (values) => console.log(values),
};
