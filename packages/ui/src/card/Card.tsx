import * as React from 'react';
import { Box } from 'reakit';
import styled from 'styled-components';

interface Props {
  width?: string;
}

const Container = styled(Box)<Props>`
  background: #ffffff;
  box-shadow: 0 3px 9px 2px #0000004a;
  border-radius: 8px;
`;

const Card: React.FunctionComponent<Props> = ({ children, ...props }) => <Container {...props}>{children}</Container>;

export default Card;
