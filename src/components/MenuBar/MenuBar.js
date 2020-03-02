import React from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import { MenuCont } from '../CommonComps/CommonComps'
import MobileMenu from '../MobileMenu/MobileMenu'
import metrics from '../../theme/metrics'
import { Link } from 'react-router-dom'

const { mq } = metrics
// import PropTypes from 'prop-types'

export const TopBarWrapper = styled.div`
  max-width: ${metrics.fullW}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`
const TopMenu = styled.div`
  display: flex;
  height: 100%;
`

const TopLink = styled(Link)`
  margin-left: 10px;
  height: 100%;
  color: #283649;
  transition: color 0.5s ease,
              background-color 0.5s ease;
  padding: 0 1rem ;
  text-decoration: none;
  display: flex;
  height: 100%;
  align-items: center;
  &:visited {
    color: #283649;
  }
  &:hover {
    background: #a4e9ff;
    color: black;
  }
`

const MenuBar = (props) => {
  return (
    <MenuCont>
      <Media query={`(max-width: ${mq.small}px)`} render={() =>
        (
          <MobileMenu />
        )}
      />
      <TopBarWrapper>
        <TopLink to='/'>
          PKT Explorer (beta)
        </TopLink>
        <Media query={`(min-width: ${mq.small}px)`} render={() =>
          (
            <TopMenu>
              <TopLink to='/blocks'>Blocks</TopLink>
              <TopLink to='/txd'>Txs per day</TopLink>
              <TopLink to='/rich'>Rich list</TopLink>
            </TopMenu>
          )}
        />
      </TopBarWrapper>
    </MenuCont>
  )
}

// MenuBar.propTypes = {
// }

// MenuBar.defaultProps = {
// }

export default MenuBar
