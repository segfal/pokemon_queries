// GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
import '@fontsource/press-start-2p';
import background from './assets/background.png';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
    background: url(${background}) no-repeat center center fixed;
    background-size: cover;
    color: #ffffff;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;