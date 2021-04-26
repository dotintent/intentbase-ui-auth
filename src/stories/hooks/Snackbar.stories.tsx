import React, { FC } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '@material-ui/core';
import { ShowSnackbarProps } from '../../providers/SnackbarProvider';
import { useSnackbar } from '../../hooks/useSnackbar';

const SnackbarMock: FC<ShowSnackbarProps> = (props) => {
  const showSnackbar = useSnackbar();

  const show = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    showSnackbar(props);
  };

  return (
    <Button color="primary" variant="contained" onClick={show}>
      Show snackbar
    </Button>
  );
};

export default {
  title: 'Hooks/Snackbar',
  component: SnackbarMock,
  argTypes: {
    severity: {
      control: {
        type: 'select',
        options: ['success', 'info', 'warning', 'error'],
      },
    },
    duration: {
      control: {
        type: 'range',
        min: 0,
        max: 10000,
        step: 1000,
      },
    },
  },
} as Meta;

const Template: Story<ShowSnackbarProps> = (args) => <SnackbarMock {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Mock snackbar message.',
  severity: 'success',
  duration: undefined,
  position: {
    vertical: 'top',
    horizontal: 'center',
  },
};
