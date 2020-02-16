import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { trHash } from '../../utils'

const TxtHash = styled.span`
  font-family: 'courier';
  font-size: 15px; /*w:9px*/
`

const HashCont = styled.div`
  display: flex;
  margin-left: 2rem;
  width: 100%;
`

const RespHash = ({ hash, size }) => {
  // const [resizeListener, sizes] = useResizeAware()

  return (
    <HashCont style={{ position: 'relative' }}>
      <TxtHash>
        {trHash(hash, size || 400)}
      </TxtHash>
    </HashCont>
  )
}

RespHash.propTypes = {
  hash: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default RespHash
