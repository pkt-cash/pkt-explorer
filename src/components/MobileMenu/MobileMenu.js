import React, { useState } from 'react'
import styled from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const MenuBt = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  color: ${({ isOpen, theme }) => isOpen ? '#fff' : '#000'};
  background: ${({ isOpen, theme }) => isOpen ? theme.colors.headerBackground : '#fff'};
  svg {
    width: 100%;
    height: 100%;
    color: inherit;
  }
`

const MenuContainer = styled(motion.div)`
  width: 100px;
  /* padding-left: 10px; */
  background-color: #fff;
  border: 0 solid #eee;
  border-width: 0 1px 1px 0;  
  position: relative;
  /* top: -5px */
`

const MenuCont = styled.div`
position: absolute;
top: 0;
left: 0;
`

const MenuItem = styled.div`
  color: #000;
  padding: 5px;
  &:hover{
    background-color: #eee;
  }
  a{
    text-decoration: none;
    &:visited {
      color: #000;
    }

  }
`

const mVar = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: -100 }
}

const MobileMenu = ({ nsAddr }) => {
  const [isOpen, toggle] = useState(false)
  return (
    <MenuCont>
      <MenuBt isOpen={isOpen} onClick={() => toggle(!isOpen)}><MdMenu className=''/></MenuBt>
      <MenuContainer
        variants={mVar}
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* <MenuItem><Link to='/blocks' onClick={() => toggle(false)}>Blocks</Link></MenuItem> */}
        <MenuItem><Link to='/transactions' onClick={() => toggle(false)}>Transactions</Link></MenuItem>
        <MenuItem><Link to='/rich' onClick={() => toggle(false)}>Rich list</Link></MenuItem>
        {nsAddr && <MenuItem><Link to={`/address/${nsAddr}`} onClick={() => toggle(false)}>Network Steward</Link></MenuItem>}
      </MenuContainer>
    </MenuCont>
  )
}

// MobileMenu.propTypes = {

// }

// MobileMenu.defaultProps = {

// }

export default MobileMenu
