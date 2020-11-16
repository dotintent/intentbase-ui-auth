import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FormButton, FormButtonProps } from '../../components/FormButton/FormButton';

export default {
  title: 'Buttons/Form button',
  component: FormButton,
} as Meta;

export const Default: Story<FormButtonProps> = (args) => (
  <FormButton {...args}>Click me!</FormButton>
);

export const Color = Default.bind({});
Color.args = {
  color: 'inherit',
};

export const Loading = Default.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Default.bind({});
Disabled.args = {
  disabled: true,
};
