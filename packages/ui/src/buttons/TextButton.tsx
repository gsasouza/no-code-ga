import styled from 'styled-components';

import { getColor, getLightenDarkenColor } from '../utils';
import RoundedButton, { Props as RoundedButtonProps } from './RoundedButton';

const TextButton = styled(RoundedButton)<RoundedButtonProps>`
  background-color: transparent;
  color: ${props => getColor(props)};
  padding: 6px 8px;
  min-width: auto;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
    color: ${props => getLightenDarkenColor(getColor(props), 30)};
  }
`;

export default TextButton;
