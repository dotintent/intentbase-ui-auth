import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Card, CardProps } from '../../components/Card/Card';
import { SignIn } from '../..';

const Wrapper: FC = ({ children, ...rest }) => {
  return <Card {...rest}>{children}</Card>;
};

export default {
  title: 'Layout/Card',
  component: Wrapper,
} as Meta;

export const Default: Story<CardProps> = (args) => <Wrapper {...args}>Example Card</Wrapper>;
Default.args = {
  fullWidth: true,
  raised: true,
};

const TemplateWithForm: Story<CardProps> = (args) => (
  <Wrapper {...args}>
    <SignIn />
  </Wrapper>
);

export const WithForm = TemplateWithForm.bind({});
WithForm.args = {
  fullWidth: true,
  raised: true,
};
