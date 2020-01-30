import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import GlobalStyles from './App.css'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Media from 'react-media'
import metrics from './theme/metrics'

const { mq } = metrics

const MainContainer = styled.div`
  display: flex;
`

const MenuCol = styled.div`
  width: 200px;
`

function App () {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MenuBar />
          <MainContainer>
            <Media query={`(min-width: ${mq.small}px)`} render={() =>
              (
                <MenuCol>
                  a menu there will be
                </MenuCol>
              )}
            />
            <div>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Home}
                  key='home' />
                <Route
                  exact
                  path='/blocks'
                  component={Blocks}
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
            </div>
          </MainContainer>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

const Home = () => <div>Home</div>
const Blocks = () => <div>Blocks</div>
const Rich = () => <div>Rich</div>
const TxResume = () => <div>TxResume</div>

export default App
