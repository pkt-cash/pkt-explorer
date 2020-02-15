import React from 'react'
import useResizeAware from 'react-resize-aware'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { trHash } from '../../utils'

const TxtHash = styled.span`
  font-family: 'courier';
  font-size: 15px; /*w:9px*/
`

const RespHash = ({ hash, size }) => {
  const [resizeListener, sizes] = useResizeAware()

  return (
    <div style={{ position: 'relative' }}>
      {resizeListener}
      <TxtHash>
        {trHash(hash, sizes.width)}
      </TxtHash>
    </div>
  )
}

RespHash.propTypes = {
  hash: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default RespHash
