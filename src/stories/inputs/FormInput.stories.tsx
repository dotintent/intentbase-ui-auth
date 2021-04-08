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

const Template: Story<TemplateProps> = ({ form, ...restArgs }) => (
  <Form
    {...form}
    onSubmit={() => {}}
    render={() => (
      <form>
        <FormInput {...restArgs} />
      </form>
    )}
  />
);

export const Default = Template.bind({});
Default.args = {
  source: 'email',
};

export const InitialValue = Template.bind({});
InitialValue.args = {
  source: 'email',
  form: {
    initialValues: {
      email: 'joe.doe@gmail.com',
    },
  },
};

export const PasswordType = Template.bind({});
PasswordType.args = {
  source: 'password',
  repeat: true,
  passwordPreview: true,
  form: {
    initialValues: {
      password: '123456m#',
    },
  },
};
