import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const HashCont = styled.span`
  /* font-family: 'courier'; */
  /* font-size: 15px; */
  /* display: flex; */
  /* white-space: nowrap; */
  word-break: break-all;
  display: inline-block;
  /* overflow: hidden; */
  /* text-overflow: ; */
  /* margin-left: 2rem; */
  /* width: 100%; */
`

const RespHash = ({ hash }) => {
  // const [resizeListener, sizes] = useResizeAware()

  return (
    <HashCont title={hash}>
      {hash}
    </HashCont>
  )
}

RespHash.propTypes = {
  hash: PropTypes.string.isRequired
}

export default RespHash
