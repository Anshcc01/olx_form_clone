import React from 'react';
import PostForm from './components/PostForm';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    background-color: #f2f4f5;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%', 
        margin: '0 auto', 
        padding: '20px',
      }}>
        <PostForm />
      </div>
    </>
  );
};

export default App; 