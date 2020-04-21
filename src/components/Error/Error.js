import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const ErrCont = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Error = ({ apiMissing }) => {
  return (
    <ErrCont>
      {apiMissing && 'The service is not working right now, please check back soon'}
    </ErrCont>
  )
}

Error.propTypes = {
  apiMissing: PropTypes.bool
}

Error.defaultProps = {
  
}

export default Error
