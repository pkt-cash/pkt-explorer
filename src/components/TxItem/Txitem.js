import * as React from 'react'
// import { motion } from 'framer-motion'
import { displayPKT } from '../../utils'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import RespHash from '../RespHash/RespHash'

const ItemCont = styled.div`
  height: 45px;
  display: flex;
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  background: #eee;
  border-radius: 4px;
  margin: 10px 0;
`

const Amount = styled.div`
  min-width: 66px
`

export const TxItem = ({ address, value, txt, size }) => {
  return (
    <ItemCont
      // variants={variants}
      // initial='closed'
      // animate='open'
    >
      {txt || <>
        <RespHash hash={address} size={size} />
        <Amount>
          {parseFloat(displayPKT(value).toFixed(2))} PKT
        </Amount>
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
