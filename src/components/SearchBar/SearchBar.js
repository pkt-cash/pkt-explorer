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
    <div>
      <MenuBt isOpen={isOpen} onClick={() => toggle(!isOpen)} />
    </div>
  )
}

export const SearchBar = styled(motion.div)`
  background-color: #fff;
`

export default SearchComp
