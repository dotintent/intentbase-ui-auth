import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PageLoading, PageLoadingProps } from '../../components/PageLoading/PageLoading';

export default {
  title: 'Layout/Page loading',
  component: PageLoading,
} as Meta;

export const Default: Story<PageLoadingProps> = (args) => <PageLoading {...args} />;

export const WithLabel = Default.bind({});
WithLabel.args = {
  label: 'Loading label',
};

export const LabelVariant = Default.bind({});
LabelVariant.args = {
  label: 'Loading label',
  labelVariant: 'h5',
};
