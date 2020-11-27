import React from 'react';
import styled from '@emotion/styled';
import { IconProceed } from '@apollo/space-kit/icons/IconProceed';
import { breakpoints } from 'gatsby-theme-apollo-core';
import { colors } from '@apollo/space-kit/colors';

const Container = styled.div({
  display: 'flex',
  flexShrink: 0,
  width: 240,
  [breakpoints.lg]: {
    width: 'auto',
    marginRight: 0,
  },
  [breakpoints.md]: {
    display: 'none',
  },
});

const StyledLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  color: colors.red.base,
  lineHeight: 2,
  textDecoration: 'none',
  ':hover': {
    color: colors.red.darker,
  },
});

const StyledIcon = styled(IconProceed)({
  height: '0.75em',
  marginLeft: '0.5em',
});

const HeaderButton = () => {
  return (
    <Container>
      <StyledLink href="https://withintent.com/about/" target="_blank" rel="noopener noreferrer">
        About Intent
        <StyledIcon weight="thin" />
      </StyledLink>
    </Container>
  );
};

export default HeaderButton;
