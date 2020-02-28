import React from 'react'
import PropTypes from 'prop-types'
import { IoIosCopy } from 'react-icons/io'
import { FaQuestion } from 'react-icons/fa'
import { BaseBt } from '../CommonComps/CommonComps'
import styled from 'styled-components'

const StyledBaseBtn = styled(BaseBt)`
  svg{
    width: 80%;
    height: 80%;
    position: relative;
    bottom: 0px;
    margin: 0 auto
  }
`

// const btVar = {
//   open: {
//     rotate: 180
//   },
//   closed: {
//     rotate: 0
//   }
// }

const Icn = ({ icn }) => {
  console.log('icn:', icn)
  switch (icn) {
    case 'copy':
      return <IoIosCopy />
    default:
      return <FaQuestion />
  }
}

const GenBt = ({ isOpen, action, icn }) => {
  return (
    <StyledBaseBtn
      // variants={btVar}
      // animate={isOpen ? 'open' : 'closed'}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      // onClick={action('click')}
      icn={icn}
    >
      <Icn icn={icn}/>
    </StyledBaseBtn>
  )
}

const icnType = PropTypes.oneOf([
  'copy'
]).isRequired

GenBt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  icn: icnType
}

Icn.propTypes = {
  icn: icnType
}

GenBt.defaultProps = {

}

export default GenBt
