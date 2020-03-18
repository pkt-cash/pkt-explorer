import React, { useState } from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import { MenuCont } from '../CommonComps/CommonComps'
import MobileMenu from '../MobileMenu/MobileMenu'
import metrics from '../../theme/metrics'
import { NavLink } from 'react-router-dom'
import Omnibox from '../Omnibox/Omnibox'
import OmniboxMobile, { OmniBt } from '../OmniboxMobile/OmniboxMobile'

const { mq } = metrics
// import PropTypes from 'prop-types'

export const TopBarWrapper = styled.div`
  max-width: ${metrics.fullW}px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
const TopMenu = styled.div`
  display: flex;
  height: 100%;
  z-index: 5;
`

const TopLink = styled(NavLink)`
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
  white-space: nowrap;
  &:visited {
    color: #283649;
  }
  &:hover,
  &.active{
    background: #a4e9ff;
    color: black;
  }
`

const MenuBar = (props) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <MenuCont>
        <TopBarWrapper>
          <Media queries={{ small: { maxWidth: mq.small } }}>
            {matches =>
              matches.small ? (
                <>
                  <MobileMenu />
                  <TopLink exact to='/'>
                  PKT Explorer (beta)
                  </TopLink>
                  <OmniBt act={() => setOpen(!isOpen)} />
                </>
              ) : (
                <>
                  <TopMenu>
                    <TopLink exact to='/'>
                      PKT Explorer (beta)
                    </TopLink>
                    <TopLink to='/blocks'>Blocks</TopLink>
                    <TopLink to='/txd'>Txs per day</TopLink>
                    <TopLink to='/rich'>Rich list</TopLink>
                  </TopMenu>
                  <Omnibox />
                </>
              )
            }
          </Media>
        </TopBarWrapper>
      </MenuCont>
      <Media query={`(max-width: ${mq.small}px)`} render={() =>

        (
          <OmniboxMobile isOpen={isOpen} />
        )}
      />
    </>
  )
}

// MenuBar.propTypes = {
// }

// MenuBar.defaultProps = {
// }

export default MenuBar
