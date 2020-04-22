import React, { useState } from 'react'
import Media from 'react-media'
import styled, { css } from 'styled-components'
import { MenuCont } from '../CommonComps/CommonComps'
import MobileMenu from '../MobileMenu/MobileMenu'
import metrics, { mqs } from '../../theme/metrics'
import { NavLink } from 'react-router-dom'
import Omnibox from '../Omnibox/Omnibox'
import OmniboxMobile, { OmniBt } from '../OmniboxMobile/OmniboxMobile'
import { ReactComponent as DrkLogo } from '../../assets/logoDrk.svg'

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
  color: #fff;
  transition: color 0.5s ease,
              background-color 0.5s ease;
  padding: 0 1rem ;
  text-decoration: none;
  display: flex;
  height: 100%;
  align-items: center;
  white-space: nowrap;
  ${({ logo }) => !logo && css`
    &:visited {
      color: #fff;
    }
    &:hover,
    &.active{
      background: #fff;
      color: black;
      @media ${mqs.small} {
        color: #fff;  
        background-color: ${({ theme }) => theme.colors.headerBackground};
      }

    }
  `}
  ${({ main }) => main && css`font-weight: 700;font-style: italic;`}
`

const Logo = styled(DrkLogo)`
 height: 40px;
`

const AlertCont = styled.div`
  background: #fff;
  padding: 0.5rem;
  text-align: center;
`

const MenuBar = ({ hasAlert, nsAddr }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <MenuCont hasAlert={hasAlert}>
        <TopBarWrapper>
          <Media queries={{ small: { maxWidth: mq.small } }}>
            {matches =>
              matches.small ? (
                <>
                  <MobileMenu nsAddr={nsAddr}/>
                  <TopLink exact to='/' main={1} logo>
                    <Logo />
                  </TopLink>
                  <OmniBt act={() => setOpen(!isOpen)} />
                </>
              ) : (
                <>
                  <TopMenu>
                    <TopLink exact to='/' main={1} logo>
                      <Logo />
                    </TopLink>
                    {/* <TopLink to='/blocks'>Blocks</TopLink> */}
                    <TopLink to='/txd'>Txs per day</TopLink>
                    <TopLink to='/rich'>Rich list</TopLink>
                    {nsAddr && <TopLink to={`/address/${nsAddr}`}>Network Stewart</TopLink>}
                  </TopMenu>
                  <Omnibox />
                </>
              )
            }
          </Media>
        </TopBarWrapper>
      </MenuCont>
      {hasAlert && <AlertCont>Out of date The most recent block appears to be {Math.floor(hasAlert / 60)} minutes old, this explorer is probably out of sync with the chain.</AlertCont>}
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
