import styled from 'styled-components';

import { getColor, getLightenDarkenColor } from '../utils';
import RoundedButton, { Props as RoundedButtonProps } from './RoundedButton';

const ContainedButton = styled(RoundedButton)<RoundedButtonProps>`
  min-width: auto;
  border-radius: 8px;
  height: 40px;
  border: 1px solid transparent;
  &:hover {
    background-color: #ffffff;
    color: ${props => getLightenDarkenColor(getColor(props), 0)};
    border: 1px solid ${props => getLightenDarkenColor(getColor(props), 0)};
    box-shadow: none;
  }
`;

export default ContainedButton;
