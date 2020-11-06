import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FormButton, FormButtonProps } from '../../components/FormButton';

export default {
  title: 'Buttons/Form button',
  component: FormButton,
} as Meta;

const Template: Story<FormButtonProps> = (args) => <FormButton {...args}>Click me!</FormButton>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};
