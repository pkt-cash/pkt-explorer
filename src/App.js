import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import BlocksScreen from './screens/BlockListScreen'

const MainContainer = styled.div`
  /* display: flex; */
`

function App () {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <MainContainer>
            <Switch>
              <Route
                exact
                path='/'
                component={Home}
                key='home' />
              <Route
                exact 
                path='/blocks'
                component={BlocksScreen}
                key='blocks' />
              <Route
                exact
                path='/rich'
                component={Rich}
                key='rich' />
              <Route
                exact
                path='/txd'
                component={TxResume}
                key='resume' />
            </Switch>
          </MainContainer>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

const Home = () => <div>Home</div>
const Rich = () => <div>Rich</div>
const TxResume = () => <div>TxResume</div>

export default App
