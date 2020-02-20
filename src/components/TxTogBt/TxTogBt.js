import React from 'react'
import PropTypes from 'prop-types'
import { IoIosArrowDown } from 'react-icons/io'
import { BaseBt } from '../CommonComps/CommonComps'
import styled from 'styled-components'

const StyledBaseBtn = styled(BaseBt)`
  cursor: pointer;
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
    <StyledBaseBtn
      variants={btVar}
      animate={isOpen ? 'open' : 'closed'}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={action}
    >
      <IoIosArrowDown />
    </StyledBaseBtn>
  )
}

TxTogBt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
}

TxTogBt.defaultProps = {

}

export default TxTogBt
