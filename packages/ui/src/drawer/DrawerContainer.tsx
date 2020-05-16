import styled from 'styled-components';
import media from 'styled-media-query';

export default styled.aside`
  background-color: #ffffff;
  padding: 2rem;
  width: 100%;
  max-width: 700px;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  ${media.lessThan('medium')`
    width: 100% !important;
  `};
`;
