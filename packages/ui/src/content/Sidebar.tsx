import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { RoundedButton } from '../buttons';

const Aside = styled.aside`
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 2rem 0 2rem 1rem;
  color: ${props => props.theme.palette.primary};
`;

const Header = styled.header`
  font-size: 22px;
  text-align: center;
  padding: 0 0 1rem 0;
  > * {
    font-weight: bold;
  }
  margin-right: 1rem;
  border-bottom: 1px solid ${props => props.theme.palette.secondary};
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary};
  position: relative;
  font-size: 18px;
  > div {
    padding: 1rem 1.5rem;
  }
`;

const ItemsWrapper = styled.nav`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  .item-selected {
    transition: border-radius 0.5s;
    border-radius: 50px 0 0 50px;
    background-color: ${props => props.theme.palette.primary};
    color: ${props => props.theme.palette.secondary};
  }

  .item-selected + a {
    transition: border-radius 0.5s;
    background-color: ${props => props.theme.palette.primary};
    > div {
      transition: border-radius 0.5s;
      border-radius: 0 50px 0 0;
      background-color: #fffef8;
    }
  }
  .item-selected::before {
    position: absolute;
    content: ' ';
    background: ${props => props.theme.palette.primary};
    right: 0;
    width: 50px;
    height: 2rem;
    top: -2rem;
  }
  .item-selected::after {
    position: absolute;
    content: ' ';
    background: #fffef8;
    right: 0;
    width: 50px;
    height: 2rem;
    top: -2rem;
    border-radius: 0 0 50px 0;
  }
  .item-selected + div {
    > div {
      transition: border-radius 0.5s;
      border-radius: 0 50px 0 0;
      background-color: #fffef8;
      width: 100%;
      height: 50px;
    }
  }
`;

const BorderPresence = styled.div`
  width: 100%;
  z-index: 1;
  background: ${props => props.theme.palette.primary};
  > div {
    border-radius: 0;
    background-color: #fffef8;
    width: 100%;
    height: 50px;
  }
`;

export interface Props {
  title?: string;
  items?: Array<{
    label: string;
    path: string;
  }>;
  footer?: {
    action: () => void;
    icon: string;
    label: string;
  };
}

const Sidebar: React.FC<Props> = ({ title, items = [], footer }) => {
  return (
    <Aside>
      <Header>
        <span>{title}</span>
      </Header>
      <ItemsWrapper>
        {items.map(({ label, path }) => (
          <Item to={path} key={path} activeClassName="item-selected">
            <div>{label}</div>
          </Item>
        ))}
        <BorderPresence>
          <div />
        </BorderPresence>
      </ItemsWrapper>
      {footer && (
        <Footer>
          <RoundedButton color="secondary" onClick={footer.action}>
            {footer.label}
          </RoundedButton>
        </Footer>
      )}
    </Aside>
  );
};

export default Sidebar;
