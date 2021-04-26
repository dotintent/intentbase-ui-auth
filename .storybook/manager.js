import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    colorPrimary: '#f7f7f7',
    colorSecondary: '#ff304d',
    brandUrl: 'https://withintent.com/',
    brandImage: 'https://withintent.com/app/uploads/2019/10/logo-4.png',
  }),
});
