import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const ErrCont = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
const Error = ({ apiMissing }) => {
  return (
    <ErrCont>
      {apiMissing ? 'The service is not working right now, please check back soon'
        : <div>Something is broken: This page is not working, return to the <Link to='/'> home page</Link> </div>
      }
    </ErrCont>
  )
}

Error.propTypes = {
  apiMissing: PropTypes.bool
}

export default Error
