import styled, { createGlobalStyle } from 'styled-components'
import theme from './theme/theme'

export default createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  text-rendering: optimizeLegibility;
  font-family: Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  
}

@font-face {
  font-family: Ubuntu;
  src: url('${process.env.PUBLIC_URL}/ubuntu.woff2') format('woff2');
}

a {
  cursor: pointer;
  color: ${theme.colors.pktLinkDark};
  text-decoration: none;
  &:hover {
    opacity: 0.7
  }
}

#root {
  width: 100vw;
  min-height: 100vh;
  min-width: 400px;
}
`

export const MainWrapper = styled.div`
width: 100vw;
height: 100vh;

padding: 0;
margin: 0;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
`
