import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import RespHash from '../RespHash/RespHash'
import { Pkt } from '../CommonComps/CommonComps'
import { Link } from 'react-router-dom'
const ItemCont = styled.div`
  min-height: 45px;
  display: flex;
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, unconfirmed }) => unconfirmed ? theme.colors.pktGrey : theme.colors.pktGreyLight};
  border-radius: 4px;
  margin: 10px 0;
`

const Amount = styled.div`
  min-width: 120px;
  margin-left: 10px;
  white-space: nowrap;
  text-align: right;
`

const HashCont = styled(Link)`
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

export const TxItem = ({ address, value, txt, size, unconfirmed }) => {
  return (
    <ItemCont
      unconfirmed={unconfirmed}
      // variants={variants}
      // initial='closed'
      // animate='open'
    >
      {txt || <>
        <HashCont to={`/address/${address}`}>
          {address}
        </HashCont>
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
  size: PropTypes.number,
  unconfirmed: PropTypes.bool
}
