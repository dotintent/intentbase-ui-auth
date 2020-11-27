const { colors: spaceKitColors } = require('@apollo/space-kit/colors');

// We can define color overrides in this file.
// The only requirement is that `primary` and `secondary` colors are `spaceColors`
// https://github.com/apollographql/space-kit#colors.
// This is a limitation of gatsby-theme-apollo-core as defined here:
// https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-core#customizing-colors
// Space-kit colors:
// https://space-kit.netlify.app/?path=/story/color--interface-colors

export const colors = {
  // Must be a spaceKitColor
  primary: spaceKitColors.red.base,
  secondary: spaceKitColors.red.light,

  // Can be any color
  primaryLight: spaceKitColors.red.lighter,
  tertiary: spaceKitColors.teal.dark,
  tertiaryLight: spaceKitColors.teal.base,
  divider: '#CCC',
  background: spaceKitColors.silver.light,
  background2: spaceKitColors.silver.base,
  text1: spaceKitColors.black.lighter,
  text2: spaceKitColors.grey.dark,
  text3: spaceKitColors.grey.light,
  text4: spaceKitColors.silver.darker,
  warning: spaceKitColors.yellow.base,
  shadow: spaceKitColors.black.darker,
  highlight: spaceKitColors.pink.base,
  highlight2: spaceKitColors.pink.lighter,
  highlight3: spaceKitColors.pink.lightest,
  hoverOpacity: 0.8,
};
