import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout as BaseLayout, Menu } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import logo from '../../../static/svg/nocodelogo-white.svg';

const Logo = styled.img`
  width: 250px;
  height: 60px;
  object-fit: cover;
  margin-left: -4rem;
`;

const Layout = styled(BaseLayout)`
  height: 100%;
`;

const PrivateContent = ({ children }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Layout>
      <Layout.Header>
        <Logo src={logo} />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} collapsible collapsed={isOpen} onCollapse={setIsOpen}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.SubMenu key="sub1" icon={<CodeOutlined />} title="Algoritmos">
              <Menu.Item key="1" onClick={() => history.push('/dashboard/algorithms')}>
                Meus Algoritmos
              </Menu.Item>
              <Menu.Item key="2" onClick={() => history.push('/dashboard/algorithms/add')}>
                Adicionar Algoritimo
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PrivateContent;
