import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <Container>
      <GlobalStyles />
      <Home />
    </Container>
  );
}

export default App;

const Container = styled.div`
`;
