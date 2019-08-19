import React, { useEffect } from 'react';
import logo from './logo.svg';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useStore } from 'effector-react';
import { postsStore, fetchPosts } from './store/posts';

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

const AppLogo = styled.img`
  animation: ${AppLogoSpin} 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

export default function App() {
  const posts = useStore(postsStore);
  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <AppWrap>
      <GlobalStyle />
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </AppLink>
      </AppHeader>
      {posts.list.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </AppWrap>
  );
}
