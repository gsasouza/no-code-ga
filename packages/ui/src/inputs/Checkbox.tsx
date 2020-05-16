import * as React from 'react';
import { Checkbox as ReakitCheckbox } from 'reakit';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: auto;
  margin-left: 20px;
  margin-bottom: 0.5rem;
  input[type='checkbox'] {
    opacity: 0;
  }
  label {
    position: relative;
  }
  label::before {
    content: '';
    display: inline-block;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #c1c3c6;
    width: 1.25em;
    height: 1.25em;
    border-radius: 5px;
  }
  label::after {
    content: '';
    display: inline-block;
    height: 6px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    transform: rotate(-45deg);
  }
  label::before,
  label::after {
    position: absolute;
  }
  label::before {
    left: -30px;
    top: -2px;
  }
  label::after {
    left: -24px;
    top: 3px;
  }
  input[type='checkbox'] + label::after {
    content: none;
  }
  input[type='checkbox']:checked + label::after {
    content: '';
    color: #fff;
  }
  input[type='checkbox']:checked + label::before {
    background-color: ${props => props.theme.palette[props.color || 'primary']};
  }
  input[type='checkbox']:focus + label::before {
    outline: ${props => props.theme.palette[props.color || 'primary']} auto 5px;
  }
`;

const Label = styled.label``;

interface Props {
  label?: string;
  value: boolean;
  onChange: (e: any) => void;
  name: string;
  color?: string;
  size?: string;
}

const Checkbox: React.FC<Props> = ({ label, value, onChange, name, color }) => {
  return (
    <Row color={color}>
      <ReakitCheckbox checked={value} onChange={onChange} name={name} id={name} />
      <Label htmlFor={name}>{label}</Label>
    </Row>
  );
};

export default Checkbox;
