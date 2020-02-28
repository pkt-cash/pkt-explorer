import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import RespHash from '../RespHash/RespHash'
import { Pkt } from '../CommonComps/CommonComps'

const ItemCont = styled.div`
  min-height: 45px;
  display: flex;
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.pktGreyLight};
  border-radius: 4px;
  margin: 10px 0;
`

const Amount = styled.div`
  min-width: 66px;
  margin-left: 10px;
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
          <Pkt amt={value} />
        </Amount>
      </>
      }
    </ItemCont>
  )
}

TxItem.propTypes = {
  address: PropTypes.string,
  value: PropTypes.string,
  txt: PropTypes.string,
  size: PropTypes.number
}
