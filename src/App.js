import React, { useEffect, useState } from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainWrapper } from './components/CommonComps/CommonComps'
// import BlockListScreen from './screens/BlockListScreen'
import BlockScreen from './screens/BlockScreen'
import TxScreen from './screens/TxScreen'
import RichListScreen from './screens/RichListScreen'
import HomeScreen from './screens/HomeScreen'
import AddressScreen from './screens/AddressScreen'
import DailyTxScreen from './screens/DailyTxScreen'
import { fetchJson } from './utils'
import endpoints from './utils/endpoints'
const { pkApi, blkDownApi, statsCoinsApi } = endpoints


function App () {
  const [hasIssue, setIssue] = useState(false)
  useEffect(() => {
    // effect to check if last block is older than 20mn
    fetchJson(`${blkDownApi}/5`)
      .then((json) => {
        if (json.error) {
          console.error('error while fetching pkData')
          // return setErr(json.error)
        }
        const cTime = new Date()
        const lastBTime = new Date(json.results[0].time)
        const secDiff = (cTime.getTime() - lastBTime.getTime()) / 1000

        if (secDiff > 20 * 60) setIssue(true)
        
        // setPkData(res)
      })
  }, [])
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MenuBar hasAlert={hasIssue}/>
          <MainWrapper>
            <Switch>
              <Route
                exact
                path='/'
                component={HomeScreen}
                key='home' />
              {/* <Route
                exact
                path='/blocks'
                component={BlockListScreen}
                key='blocks' /> */}
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
