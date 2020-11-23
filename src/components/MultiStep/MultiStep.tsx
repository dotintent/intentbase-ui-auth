import React, {
  Children,
  cloneElement,
  createContext,
  FC,
  isValidElement,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { PropTypes, TypographyVariant } from '@material-ui/core';
import clsx from 'clsx';
import {
  PageButton,
  PageTitle,
  ProgressBarDot,
  ProgressBarInnerWrapper,
  ProgressBarOuterWrapper,
  ProgressBarPosition,
  ProgressBarStep,
  ProgressTitle,
  Title,
} from './MultiStep.styled';
import { ButtonVariant } from '../../common/interfaces/MaterialUI';

interface WizardContextProps {
  currentPage: number;
  changePage: (prevPage: SetStateAction<number>) => void;
  totalPageNumber: number;
  headers: Array<any> | undefined | null;
}

export const WizardContext = createContext<WizardContextProps>({
  currentPage: 0,
  changePage: () => {},
  totalPageNumber: 0,
  headers: [],
});

interface ProgressBarProps {
  labelsVariant?: TypographyVariant;
  position?: ProgressBarPosition;
  clickable?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  clickable = false,
  labelsVariant = 'caption',
}) => {
  const { currentPage, totalPageNumber, headers, changePage } = useContext(WizardContext);
  const ref = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setBarWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  return (
    <ProgressBarOuterWrapper ref={ref} className="progressBar">
      {[...Array(totalPageNumber)].map((i, k) => (
        <ProgressBarStep
          className="progressBar__step"
          key={k}
          clickable={clickable}
          onClick={() => {
            clickable && changePage(k);
          }}
        >
          <ProgressBarDot
            className="progressBar__step__dot"
            active={currentPage >= k}
            left={`${(barWidth / totalPageNumber) * k}px`}
          />
          {headers && (
            <ProgressTitle
              className="progressBar__step_title"
              variant={labelsVariant}
              active={currentPage === k}
              left={`${(barWidth / totalPageNumber) * k + 5}px`}
            >
              {headers[k]}
            </ProgressTitle>
          )}
        </ProgressBarStep>
      ))}
      <ProgressBarInnerWrapper
        className="progressBar--inner"
        scaleX={(currentPage + 1) / totalPageNumber}
      />
    </ProgressBarOuterWrapper>
  );
};

interface PageProps {
  title?: string;
  titleVariant?: TypographyVariant;
  continueButtonLabel?: string;
  continueButtonVariant?: ButtonVariant;
  continueButtonColor?: PropTypes.Color;
  shouldMoveNext?: boolean;
  pageIndex?: number;
  className?: string;
}

const Page: FC<PageProps> = ({
  children,
  continueButtonLabel,
  continueButtonVariant = 'contained',
  continueButtonColor = 'primary',
  title,
  titleVariant = 'h4',
  shouldMoveNext,
  pageIndex,
  className,
}) => {
  const { currentPage, changePage, totalPageNumber } = useContext(WizardContext);

  useEffect(() => {
    if (shouldMoveNext && currentPage === pageIndex) {
      changePage(currentPage + 1);
    }
  }, [shouldMoveNext, currentPage, changePage, pageIndex]);

  if (currentPage !== pageIndex) {
    return null;
  }

  return (
    <div className={clsx(className, 'page')}>
      {title && (
        <PageTitle className="page__title" variant={titleVariant}>
          {title}
        </PageTitle>
      )}
      {children}
      {continueButtonLabel && (
        <PageButton
          className="page__button--continue"
          variant={continueButtonVariant}
          color={continueButtonColor}
          disabled={currentPage === totalPageNumber - 1}
          onClick={() => changePage((prevPage) => prevPage + 1)}
        >
          {continueButtonLabel}
        </PageButton>
      )}
    </div>
  );
};

export interface WizardProps {
  title?: string;
  titleVariant?: TypographyVariant;
  titleAlign?: PropTypes.Alignment;
  progressBarPosition?: ProgressBarPosition;
  progressBarClickable?: boolean;
  className?: string;
}

const Wizard: FC<WizardProps> = ({
  title,
  titleVariant = 'h3',
  titleAlign = 'center',
  children,
  className,
}) => {
  // const [currentPage, setCurrentPage] = useState(0);
  const isPage = (child: React.ReactElement) => child.type === Page;
  const totalPageNumber = useMemo(
    () =>
      Children.count(
        Children.map(children, (child) => {
          if (isValidElement(child) && isPage(child)) {
            return child;
          }
          return undefined;
        }),
      ),
    [children],
  );
  const setPage = (newPageIndex?: number): number => {
    if (newPageIndex === undefined) {
      return 0;
    }
    if (totalPageNumber > newPageIndex) {
      return newPageIndex;
    }
    if (totalPageNumber <= newPageIndex) {
      return totalPageNumber - 1;
    }
    return 0;
  };

  const useStateReducer = (prevState: number, newState: SetStateAction<number>) =>
    typeof newState === 'function' ? setPage(newState(prevState)) : setPage(newState);
  const useStateInitializer = (initialValue: number | (() => number)) =>
    typeof initialValue === 'function' ? setPage(initialValue()) : setPage(initialValue);
  const useCurrentPage = (initialValue: number) =>
    useReducer(useStateReducer, setPage(initialValue), useStateInitializer);

  const [currentPage, changePage] = useCurrentPage(0);

  return (
    <WizardContext.Provider
      value={{
        currentPage,
        changePage,
        totalPageNumber,
        headers: Children.map(children, (child) => {
          if (isValidElement(child)) {
            const { props } = child;
            if (isPage(child)) {
              return props.title ? props.title : '';
            }
          }
          return null;
        }),
      }}
    >
      <div className={clsx(className, 'multistep')}>
        {title && (
          <Title
            className="multistep__title"
            variant={titleVariant}
            align={titleAlign}
            gutterBottom
          >
            {title}
          </Title>
        )}
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, { key: index, pageIndex: index });
          }
          return child;
        })}
      </div>
    </WizardContext.Provider>
  );
};

export { Page, Wizard };
