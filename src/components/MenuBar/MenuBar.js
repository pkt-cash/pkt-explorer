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
`
const MenuItem = styled.div`
  margin-left: 10px

`

const TopLink = styled(Link)`
  color: #283649;
  text-decoration: none;
  &:visited {
    color: #283649;
  }
  &:hover {
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
              <MenuItem><TopLink to='/blocks'>Blocks</TopLink></MenuItem>
              <MenuItem><TopLink to='/txd'>Txs per day</TopLink></MenuItem>
              <MenuItem><TopLink to='/rich'>Rich list</TopLink></MenuItem>
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
