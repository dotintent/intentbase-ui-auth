import { Button, ButtonProps, Typography, TypographyProps } from '@material-ui/core';
import { styled } from '../../theme';

const progressNonActiveColor = '#CCC';

export const Title = styled(Typography)<TypographyProps>`
  margin-bottom: 52px;
`;

export const PageTitle = styled(Typography)<TypographyProps>`
  margin-bottom: 38px;
`;

export const ProgressBarBase = styled.div`
  height: 6px;
  border-radius: 3px;
`;

export type ProgressBarPosition = 'bottom' | 'top' | 'hide';

export const ProgressBarOuterWrapper = styled(ProgressBarBase)`
  position: relative;
  width: 100%;
  background: ${progressNonActiveColor};
  margin: 52px 0;
`;

interface ProgressBarInnerWrapperProps {
  scaleX: number;
}

export const ProgressBarInnerWrapper = styled(ProgressBarBase)<ProgressBarInnerWrapperProps>`
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  transition: transform 0.5s ease-out;
  transform: scaleX(${(props) => props.scaleX});
  transform-origin: 0 50%;
`;

interface ProgressBarStepProps {
  clickable?: boolean;
}

export const ProgressBarStep = styled.div<ProgressBarStepProps>`
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;

interface ProgressBarDotProps {
  active?: boolean;
  left?: string;
}

export const ProgressBarDot = styled.span<ProgressBarDotProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active ? theme.palette.primary.main : progressNonActiveColor};
  transition: background 0.3s ease-out;
  z-index: 1;
  top: -7px;
  left: ${(props) => (props.left ? props.left : '-1px')};
`;

interface ProgressTitleProps extends TypographyProps {
  active?: boolean;
  left: string;
}

export const ProgressTitle = styled(Typography)<ProgressTitleProps>`
  position: absolute;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.primary};
  transition: background 0.3s ease-out;
  top: 21px;
  left: ${({ left }) => left};
`;

export const PageButton = styled(Button)<ButtonProps>`
  margin-top: 50px;
`;
