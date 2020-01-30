import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { MdSearch } from 'react-icons/md'
export const MenuBt = styled(MdSearch)`
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

const SearchComp = (props) => {
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

export const SearchBar = styled(motion.div)`
  background-color: #fff;
`

export default SearchComp
