import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { mqs } from '../../theme/metrics'
import { displayPKT } from '../../utils'

const TxCont = styled.div`

`
const TxIdCont = styled.div`

`
const TxColsCont = styled.div`
  display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  }
`
const TxCol = styled.div`
  flex: 1
`
const TxColSep = styled.div`
  width: 20px;
  @media ${mqs.small} {
    display: none;
  }
`

const Tx = styled.div`
  height: 30px;
  @media ${mqs.small} {
    height: auto;
  }
`


const TxBlock = ({ txData }) => {
  const { txid, input, output } = txData
  return (
    <TxCont>
      <TxIdCont>
        {txid}
      </TxIdCont>
      <TxColsCont>
        <TxCol>
          {input.length > 0
            ? input.map((data, i) => <Tx key={`txIn-${i}`}>{data.address} | {parseFloat(displayPKT(data.value).toFixed(2))}</Tx>)
            : <Tx>No Inputs (Newly Generated Coins)  </Tx>
          }
        </TxCol>
        <TxColSep>=&gt;</TxColSep>
        <TxCol>
          {output.map((data, i) => <Tx key={`txIn-${i}`}>{data.address} | {parseFloat(displayPKT(data.value).toFixed(2))}</Tx>)}
        </TxCol>
      </TxColsCont>

    </TxCont>
  )
}

TxBlock.propTypes = {
  txData: PropTypes.shape({
    txid: PropTypes.string.isRequired,
    input: PropTypes.array.isRequired,
    output: PropTypes.array.isRequired
  }).isRequired
}

export default TxBlock
