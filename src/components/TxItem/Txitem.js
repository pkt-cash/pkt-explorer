import * as React from 'react'
import { motion } from 'framer-motion'
import { displayPKT } from '../../utils'
import styled from 'styled-components'

const ItemCont = styled.div`
  height: 45px;
  display: flex;
  padding: 10px;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  margin: 10px 0;
`

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

export const TxItem = ({ i, address, value, txt }) => {
  const style = { border: `2px solid ${colors[i]}` }
  return (
    <ItemCont
      // variants={variants}
      // initial='closed'
      // animate='open'
    >
      {txt
        ? txt
        : <>
          {address} | {parseFloat(displayPKT(value).toFixed(2))} PKT
        </>
      }
    </ItemCont>
  )
}
