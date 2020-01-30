import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

export const MenuBt = styled(MdMenu)`
  width: 50px;
  height: 50px;
  padding: 5px;
  color: ${({ isOpen, theme }) => isOpen ? '#000' : '#fff'};
  background: ${({ isOpen, theme }) => isOpen ? theme.colors.pktBlueLighter : theme.colors.pktBlueDarker}
  ${({ isOpen, theme }) => {
    isOpen
      ? css`color: #fff; background: ${theme.colors.pktBlueDarker}`
      : css`color: #000; background: ${theme.colors.pktBlueLighter}`
  }}
`

const MenuContainer = styled(motion.div)`
  width: 200px;
  padding-left: 10px;
  background-color: #ccc;
  position: relative;
  top: -5px
`

const MenuCont = styled.div`
position: absolute;
top: 0;left: 0;
`

const MenuItem = styled.div`
  color: #000;
`

const mVar = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: -200 }
}

const MobileMenu = (props) => {
  const [isOpen, toggle] = useState(false)
  return (
    <MenuCont>
      <MenuBt isOpen={isOpen} onClick={() => toggle(!isOpen)} />
      <MenuContainer
        variants={mVar}
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.2, ease: 'linear' }}
      >
        <MenuItem><Link to='/blocks' onClick={() => toggle(false)}>Blocks</Link></MenuItem>
        <MenuItem><Link to='/txd' onClick={() => toggle(false)}>Txs per day</Link></MenuItem>
        <MenuItem><Link to='/rich' onClick={() => toggle(false)}>Rich list</Link></MenuItem>
      </MenuContainer>
    </MenuCont>
  )
}

// MobileMenu.propTypes = {

// }

// MobileMenu.defaultProps = {

// }

export default MobileMenu
