import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import RespHash from '../RespHash/RespHash'
import { Pkt } from '../CommonComps/CommonComps'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip/Tooltip'

const ItemCont = styled.div`
  min-height: 45px;
  display: flex;
  flex: 1;
  padding: 10px;
  align-items: baseline;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.pktPageBackground};
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

const Spent = styled.div``

const Inputs = styled.div`
  font-size: 0.8rem;
`

// spent !== undefined and inputs > 0 are mutually exclusive
export const TxItem = ({ address, value, txt, size, spent, inputs }) => {
  return (
    <ItemCont>
      {txt || <>
        <HashCont to={`/address/${address}`}>
          {address}
        </HashCont>
        <Amount>
          <Pkt amt={value} />
        </Amount>
        {typeof (spent) === 'boolean' &&
          (spent
            ? <Tooltip type="orangeDiamond">This output has been spent by the recipient</Tooltip>
            : <Tooltip type="blueDiamond">This output has not yet been spent by the recipient</Tooltip>
          )
        }
        {inputs > 0 && <Tooltip tooltip={<Inputs>({inputs})</Inputs>}>
          Transaction was funded by spending {inputs} separate payments to this address
          </Tooltip>
        }
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
  unspent: PropTypes.bool
}
