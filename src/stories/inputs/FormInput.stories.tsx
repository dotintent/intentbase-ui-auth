import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Form } from 'react-final-form';
import { FormInput, FormInputProps } from '../../components/FormInput/FormInput';

export default {
  title: 'Inputs/Form input',
  component: FormInput,
} as Meta;

interface TemplateProps extends FormInputProps {
  form?: {
    initialValues?: { email?: string; password?: string };
  };
}

const Template: Story<TemplateProps> = (args) => (
  <Form
    {...args.form}
    onSubmit={() => {}}
    render={() => (
      <form>
        <FormInput {...args} />
      </form>
    )}
  />
);

export const Default = Template.bind({});
Default.args = {
  id: 'email',
  name: 'email',
  label: 'Email',
};

export const InitialValue = Template.bind({});
InitialValue.args = {
  id: 'email',
  name: 'email',
  label: 'Email',
  form: {
    initialValues: {
      email: 'joe.doe@gmail.com',
    },
  },
};

export const PasswordType = Template.bind({});
PasswordType.args = {
  id: 'password',
  name: 'password',
  label: 'Password',
  type: 'password',
  form: {
    initialValues: {
      password: '123456m#',
    },
  },
};
