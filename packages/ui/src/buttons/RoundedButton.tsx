import { Spinner6 } from '@styled-icons/icomoon/Spinner6';

import * as React from 'react';
import { Button, ButtonProps } from 'reakit';
import styled, { css } from 'styled-components';

import { getLightenDarkenColor, getFontColor, getColor } from '../utils';

export interface Props extends ButtonProps {
  color?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Spin = styled(Spinner6)<Pick<Props, 'isLoading'>>`
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  margin-left: auto;
  margin-right: auto;
  box-shadow: none !important;
  width: 40px;
  color: #176cd8;
  opacity: 0.7;
  ${props => !props.isLoading && 'visibility: hidden;'};
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledButton = styled(Button)<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 1;
  border-radius: 500px;
  padding: 6.4px 15px;
  font-family: Roboto, sans-serif;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border-width: 0;
  letter-spacing: normal;
  min-width: 160px;
  text-transform: capitalize;
  white-space: normal;
  cursor: pointer;
  color: ${props => getFontColor(getColor(props))};
  ${props => props.fullWidth && 'width: 100%'};
  background-color: ${props => getColor(props)};
  &:hover {
    background-color: ${props => getLightenDarkenColor(getColor(props), 30)};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: rgb(221, 221, 221);
  }
  > svg {
    margin-right: 6px;
  }
`;

const SpinContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const Container = styled.div<{ fullWidth?: boolean; isLoading?: boolean }>`
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      > button {
        width: 100%;
      }
    `};
  position: relative;
  border-radius: 500px;
  div:first-child {
    position: absolute;
    border-radius: 500px;
    top: 0;
    left: 0;
    visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
    > svg {
      border-radius: 500px;
      height: 40px;
    }
  }
`;

const RoundedButton: React.FunctionComponent<Props> = ({ children, fullWidth, ...props }) => {
  const disabled = props.disabled || props.isLoading;
  return (
    <Container {...props} fullWidth={fullWidth} onClick={undefined}>
      <SpinContainer>
        <Spin {...props} onClick={undefined} />
      </SpinContainer>

      <StyledButton {...props} disabled={disabled}>
        {children}
      </StyledButton>
    </Container>
  );
};

export default RoundedButton;
