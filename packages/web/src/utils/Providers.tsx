import * as React from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

import theme from './theme';

// Call it once in your app. At the root of your app is the best place
toast.configure();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e5e5e5;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 { 
    color: rgba(0,0,0,.85);
    margin: 0;
    font-weight: 500;
  }
  td, th {
    text-align: center !important;
  }
  .text-al
  .__react_component_tooltip {
    max-width: 10rem;
  }
  .tooltip {
    z-index: 99999;
  }
  .ant-select-item {
    font-size: 14px !important;
    min-height: 0 !important;
  }
`;

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactTooltip effect="solid" className="notranslate tooltip" />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
