import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { IoIosArrowDown } from 'react-icons/io'
import { motion } from 'framer-motion'

const BtCont = styled(motion.div)`
width: 20px;
height: 20px;
border-radius: 3px;
margin-right: 10px;
background-color: ${({ theme }) => theme.colors.pktGrey};
display: inline-block;
position: relative;
top: 4px;
svg{
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 1px;
}
`

const btVar = {
  open: {
    rotate: 180
  },
  closed: {
    rotate: 0
  }
}

const TxTogBt = ({ isOpen, action }) => {
  return (
    <BtCont
      variants={btVar}
      animate={isOpen ? 'open' : 'closed'}
      whileHover={{ scale: 1.2}}
      whileTap={{ scale: 0.8 }}
      onClick={action}
    >
      <IoIosArrowDown />
    </BtCont>
  )
}

TxTogBt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
}

TxTogBt.defaultProps = {

}

export default TxTogBt
