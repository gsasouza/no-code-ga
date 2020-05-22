import * as React from 'react';
import styled from 'styled-components';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';

import { useAuthUser } from '../../utils/security';

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ children }) => {
  const { authUser } = useAuthUser();
  const { signIn } = useGoogleLogin({
    clientId: '486568143882-q60mcrj11ecklobkc53a0vbv499eo6g1.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onSuccess: response => authUser(response as GoogleLoginResponse),
    onFailure: () => {}, // eslint-disable-line
    onAutoLoadFinished: () => {}, // eslint-disable-line
  });

  return (
    <Content>
      <Card>
        <Button type="primary" icon={<GoogleOutlined />} onClick={signIn} size="large">
          Login with google
        </Button>
      </Card>
    </Content>
  );
};

export default Home;
