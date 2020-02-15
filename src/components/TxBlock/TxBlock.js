import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { mqs } from '../../theme/metrics'
import { displayPKT } from '../../utils'
import { TxItem } from '../TxItem/Txitem'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import TxTogBt from '../TxTogBt/TxTogBt'

const TxBlockCont = styled(motion.div)``

const TxLabel = styled.div`

`

const TxlistCont = styled(motion.div)`
  overflow: hidden
`

const listVars = {
  open: {
    height: 'auto'
  },
  closed: {
    height: 65
  }
}

const TxCol = styled.div`
  width:47%;
  /* background: #eee; */
  @media ${mqs.small} {
    width:100%;
  }
`

const TxColsCont = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

const TxColSep = styled.div`
  width: 20px;
  height: ${({ small }) => small ? 'auto' : '45px'};
  display: flex;
  margin: 10px 0;
  align-items: center;
  text-align: center;
  @media ${mqs.small} {
    display: none;
  }
`

// import styled from 'styled-components'
const TxBlock = ({ txData }) => {
  const [isOpen, togOpen] = useState(false)
  const { txid, input, output, blockTime } = txData
  return (
    <TxBlockCont>
      <ListCont>
        <ListLabelCont>
          <TxLabel>
            <TxTogBt isOpen={isOpen} action={() => togOpen(!isOpen)}/>
            Transaction: {txid}
          </TxLabel>
          <TxLabel>
            mined: {blockTime}
          </TxLabel>
        </ListLabelCont>
        <TxlistCont
          variants={listVars}
          animate={isOpen ? 'open' : 'closed'}
          initial='closed'
          transition={{ duration: 0.5, type: 'tween' }}
        >
          <TxColsCont>
            <TxCol>
              {input.length
                ? input.map((data, i) => <TxItem key={`inputItem-${i}}`}>
                  {data.address} | {parseFloat(displayPKT(data.value).toFixed(2))} PKT
                </TxItem>)
                : <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            </TxCol>
            <TxColSep>=&gt;</TxColSep>
            <TxCol>
              {output.map((data, i) => <TxItem key={`outputItem-${i}}`} address={data.address} value={data.value} />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
        <TxColsCont>
          <TxCol>
            Total Inputs = {input.length}
          </TxCol>
          <TxColSep small/>
          <TxCol>
            Total Outputs = {output.length}
          </TxCol>
        </TxColsCont>
      </ListCont>
    </TxBlockCont>
  )
}

TxBlock.propTypes = {
  txData: PropTypes.shape({
    txid: PropTypes.string.isRequired,
    blockTime: PropTypes.string.isRequired,
    input: PropTypes.array.isRequired,
    output: PropTypes.array.isRequired
  }).isRequired
}

export default TxBlock
