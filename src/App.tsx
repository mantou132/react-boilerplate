import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { ReactComponent as Logo } from './logo.svg';
import Home from './pages/home';
import About from './pages/about';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 0;
  }
`;

const AppWrap = styled.div`
  text-align: center;
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled(Logo)`
  animation: ${AppLogoSpin} 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const ExternalLink = styled.a`
  color: #61dafb;
`;
const InternalLink = styled(Link)`
  color: #61dafb;
`;
const Nav = styled.div`
  ${ExternalLink}, ${InternalLink} {
    margin: 0 0.5em;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <AppWrap>
        <GlobalStyle />
        <AppHeader>
          <AppLogo />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Nav>
            <ExternalLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </ExternalLink>
            <InternalLink to="/">Home</InternalLink>
            <InternalLink to="/about">About</InternalLink>
          </Nav>
        </AppHeader>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </AppWrap>
    </BrowserRouter>
  );
}
