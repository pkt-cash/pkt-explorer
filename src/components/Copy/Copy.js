import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IoIosCopy } from 'react-icons/io'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const CopyBt = styled(motion.button)`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.pktGrey};
  display: inline-block;
  position: relative;
  top: -3px;
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

export default ({ value }) => (
  <CopyToClipboard text={value}
    onCopy={() => console.log('copy !!!', value)}>
    {/* <GenBt icn='copy' /> */}
    <CopyBt
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    ><IoIosCopy /></CopyBt>
  </CopyToClipboard>
)
