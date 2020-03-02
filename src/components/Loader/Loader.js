import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const LoaderCont = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: center;
`
const LoaderTxt = styled.div`
  margin-bottom: 20px;
  font-size: 2rem;
  ${({ small }) => small && css`font-size: 1.4rem; margin-bottom: 10px;`};
`

const LoaderBox = styled(motion.div)`
  background-color: #ccc;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ small }) => small && css`width: 50px; height: 50px;`};
`

export const LoaderWrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center
`

const Loader = ({ text, small }) => {
  return (
    <LoaderCont>
      {text && <LoaderTxt small={small}>{text}</LoaderTxt>}
      <LoaderBox
        small={small}
        animate={{ scale: 0.5, rotate: 180, opacity: 0.5 }}
        transition={{
          yoyo: Infinity,
          duration: 2,
          ease: 'easeInOut'
        }}
      >
        PKT
      </LoaderBox>
    </LoaderCont>
  )
}

Loader.propTypes = {
  text: PropTypes.string,
  small: PropTypes.bool
}

export default Loader
