import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import RespHash from '../RespHash/RespHash'
import { Pkt } from '../CommonComps/CommonComps'
import { Link } from 'react-router-dom'
import Help from '../Help/Help'
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
  min-width: 130px;
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

const ScriptHashCont = styled.span`
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

const Spent = styled.span``

const Inputs = styled.div`
  font-size: 0.8rem;
`

// spent !== undefined and inputs > 0 are mutually exclusive
export const TxItem = ({ address, value, txt, size, spent, inputs }) => {
  let addr = <HashCont to={`/address/${address}`}>
    {address}
  </HashCont>
  if (/^script:ajAJ\+REC/.test(address) && value === "0") {
    return <ItemCont>
      <span><Help.PacketCryptCommitment>PacketCrypt</Help.PacketCryptCommitment> Commitment</span>
    </ItemCont>
  } else if (/^script:aiSqI/.test(address) && value === "0") {
    return <ItemCont>
      <span><Help.SegwitCommitment>Segwit</Help.SegwitCommitment> Commitment</span>
    </ItemCont>
  } else if (/^script:/.test(address)) {
    addr = <ScriptHashCont>
      Custom script: {Buffer.from(address.slice(7), 'base64').toString('hex')}
    </ScriptHashCont>
  }
  return (
    <ItemCont>
      {txt || <>
        {addr}
        <Amount>
          <Pkt amt={value} />
        </Amount>
        {typeof (spent) === 'boolean' &&
          (spent
            ? <Spent title="This output has been spent" aria-label="This output has been spent">🔸</Spent>
            : <Spent title="This output has not yet been spent" aria-label="This output has not yet been spent">🔹</Spent>
          )
        }
        {inputs > 0 && <Inputs
          title={`Transaction was funded by spending ${inputs} separate payments to this address`}
        >
            ({inputs})
        </Inputs>
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
