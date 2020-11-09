import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SignIn, SignInProps } from '../../containers/SignIn/SignIn';

export default {
  title: 'Forms/Sign In',
  component: SignIn,
} as Meta;

const Template: Story<SignInProps> = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
