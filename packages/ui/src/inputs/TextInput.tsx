import * as React from 'react';
import { Box } from 'reakit';
import styled from 'styled-components';

import { getColor, getFontColor } from '../utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  touched?: boolean;
  error?: string;
  value?: string;
  color?: string;
  forwardRef?: React.Ref<HTMLInputElement>;
}

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0.5rem 0;
`;

export const Label = styled.label<{ fontColor?: string }>`
  margin-bottom: 6px;
  color: ${props => props.fontColor || getFontColor(getColor(props))};
`;

export const Input = styled.input<Omit<Props, 'label' | 'forwardRef'>>`
  padding: 0 1rem;
  font-size: 1rem;
  height: 2.5rem;
  outline: 0;
  border-radius: 4px;
  border: 1px solid #a1a1a1;
  transition: box-shadow 0.2s, border-color 0.2s;
  border: 1px solid ${props => props.theme.palette.primary};
  &:focus {
    box-shadow: 0 2px 4px 0 #33afdf40;
    outline-color: ${props => props.theme.palette.accent};
    border-color: #33afdf;
  }
  &:hover {
    box-shadow: 0 2px 4px 0 #33afdf40;
  }
  &:disabled {
    color: -internal-light-dark-color(rgb(84, 84, 84), rgb(170, 170, 170));
  }
  &::placeholder {
    color: rgba(166, 173, 181, 0.51);
  }
  ${props => props.error && props.touched && `border-color: ${props.theme.palette.error}`};
`;

const Error = styled.span<Pick<Props, 'touched' | 'error'>>`
  height: 1.5rem;
  color: ${props => props.theme.palette.error};
  visibility: ${props => (props.error && props.touched ? 'visible' : 'hidden')};
`;

const TextInput: React.FC<Props> = ({ label, forwardRef, name, error, touched, color, ...props }) => {
  return (
    <Container>
      <Label htmlFor={name} color={color}>
        {label}
      </Label>
      <Input id={name} name={name} {...props} error={error} touched={touched} ref={forwardRef} />
      <Error error={error} touched={touched}>
        {error}
      </Error>
    </Container>
  );
};

export default React.forwardRef<HTMLInputElement, Props>((props, ref) => <TextInput {...props} forwardRef={ref} />);
