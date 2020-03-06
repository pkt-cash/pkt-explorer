import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainWrapper } from './components/CommonComps/CommonComps'
import BlockListScreen from './screens/BlockListScreen'
import BlockScreen from './screens/BlockScreen'
import RichListScreen from './screens/RichListScreen'
import HomeScreen from './screens/HomeScreen'
import AddressScreen from './screens/AddressScreen'
import TxScreen from './screens/TxScreen'

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
                component={HomeScreen}
                key='home' />
              <Route
                exact
                path='/blocks'
                component={BlockListScreen}
                key='blocks' />
              <Route
                exact
                path='/rich'
                component={RichListScreen}
                key='rich' />
              <Route
                exact
                path='/txd'
                component={TxScreen}
                key='resume' />
              <Route
                exact
                path='/address/:addr'
                component={AddressScreen}
                key='address' />
              <Route
                exact
                path='/block/:id'
                component={BlockScreen}
                key='address' />
            </Switch>
          </MainWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
