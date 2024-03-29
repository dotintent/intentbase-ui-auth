import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import * as MultiStep from '../../components/MultiStep/MultiStep';
import { WizardProps } from '../../components/MultiStep/MultiStep';

const Wrapper: FC<WizardProps> = ({ children, ...rest }) => {
  return (
    <MultiStep.Wizard {...rest}>
      <MultiStep.Page continueButtonLabel="Continue" title="Section 1">
        <h3>Section 1 body</h3>
      </MultiStep.Page>
      <MultiStep.Page continueButtonLabel="Continue" title="Section 2">
        <h3>Section 2 body</h3>
      </MultiStep.Page>
      <MultiStep.Page continueButtonLabel="Continue" title="Section 3">
        <h3>Section 3 body</h3>
      </MultiStep.Page>
      {children}
    </MultiStep.Wizard>
  );
};

export default {
  title: 'Layout/Multi step',
  component: Wrapper,
} as Meta;

const Template: Story = (args) => <Wrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Example Multi Step',
};

const TemplateWithProgressBar: Story = (args) => (
  <Wrapper {...args}>
    <MultiStep.ProgressBar {...args} />
  </Wrapper>
);

export const WithProgressBar = TemplateWithProgressBar.bind({});
WithProgressBar.args = {
  title: 'Example Multi Step',
  clickable: true,
};
