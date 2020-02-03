import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainWrapper } from './components/CommonComps/CommonComps'
import BlocksScreen from './screens/BlockListScreen'
import RichListScreen from './screens/RichListScreen'

function App () {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <MainWrapper>
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
                component={RichListScreen}
                key='rich' />
              <Route
                exact
                path='/txd'
                component={TxResume}
                key='resume' />
            </Switch>
          </MainWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

const Home = () => <div>Home</div>
const TxResume = () => <div>TxResume</div>

export default App
