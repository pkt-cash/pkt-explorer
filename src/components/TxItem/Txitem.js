import * as React from 'react'
// import { motion } from 'framer-motion'
import { displayPKT } from '../../utils'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ItemCont = styled.div`
  height: 45px;
  display: flex;
  padding: 10px;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  margin: 10px 0;
`

export const TxItem = ({ address, value, txt }) => {
  return (
    <ItemCont
      // variants={variants}
      // initial='closed'
      // animate='open'
    >
      {txt || <>
        {address} | {parseFloat(displayPKT(value).toFixed(2))} PKT
      </>
      }
    </ItemCont>
  )
}

TxItem.propTypes = {
  address: PropTypes.string,
  value: PropTypes.string,
  txt: PropTypes.string
}
