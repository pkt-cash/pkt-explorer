import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainWrapper } from './components/CommonComps/CommonComps'
import BlockListScreen from './screens/BlockListScreen'
import BlockScreen from './screens/BlockScreen'
import TxScreen from './screens/TxScreen'
import RichListScreen from './screens/RichListScreen'
import HomeScreen from './screens/HomeScreen'
import AddressScreen from './screens/AddressScreen'
import DailyTxScreen from './screens/DailyTxScreen'

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
                component={DailyTxScreen}
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
                key='block' />
              <Route
                exact
                path='/tx/:id'
                component={TxScreen}
                key='transaction' />
            </Switch>
          </MainWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
