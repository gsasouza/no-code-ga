import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import { Card as BaseCard, Button } from 'antd';
import logo from '../../../static/svg/nocodelogo.svg';
import background from '../../../static/img/login-background.jpg';

import { useAuthUser } from '../../utils/security';

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  background-size: cover;
  background-image: url("${background}");
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Dimmer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.6;
`;

const Logo = styled.img`
  margin: 1rem auto;
  width: 250px;
  height: 60px;
  object-fit: cover;
`;

const Card = styled(BaseCard)`
  .ant-card-body {
    display: flex;
    flex-direction: column;
  }
`;

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { authUser } = useAuthUser();
  const history = useHistory();
  const { signIn } = useGoogleLogin({
    clientId: '486568143882-q60mcrj11ecklobkc53a0vbv499eo6g1.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onSuccess: async response => {
      setIsLoading(true);
      await authUser(response as GoogleLoginResponse);
      setIsLoading(false);
      history.push('/dashboard/algorithms');
    },
    onFailure: () => {}, // eslint-disable-line
    onAutoLoadFinished: () => {}, // eslint-disable-line
  });

  return (
    <Content>
      <Dimmer />
      <Card>
        <Logo src={logo} />
        <Button type="primary" icon={<GoogleOutlined />} onClick={signIn} size="large" loading={isLoading}>
          Login with google
        </Button>
      </Card>
    </Content>
  );
};

export default Home;
