import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IoIosCopy } from 'react-icons/io'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const CopyBt = styled(motion.button)`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-left: 10px;
  margin-top: 0.8rem;
  background-color: ${({ theme }) => theme.colors.pktGrey};
  display: inline-block;
  position: relative;
  border-width: 0;
  svg{
    width: 15px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: 2px;
    /* bottom: 1px; */
  }
`

const Copy = ({ value, action = console.info }) => (
  <CopyToClipboard text={value}
    onCopy={() => action(value)}>
    {/* <GenBt icn='copy' /> */}
    <CopyBt
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    ><IoIosCopy /></CopyBt>
  </CopyToClipboard>
)

Copy.propTypes = {
  value: PropTypes.string,
  action: PropTypes.func
}

export default Copy
