import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0;
  font-family: "roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}

a {
  cursor: pointer;
  color: #08C1FF;
  text-decoration: none;
}

#root {
  width: 100vw;
  min-height: 100vh;
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
