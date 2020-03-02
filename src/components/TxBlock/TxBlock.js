import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import metrics, { mqs } from '../../theme/metrics'
import { TxItem } from '../TxItem/Txitem'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import TxTogBt from '../TxTogBt/TxTogBt'
import { IoMdArrowForward } from 'react-icons/io'
import RespHash from '../RespHash/RespHash'
import { DateTime } from 'luxon'
const TxBlockCont = styled(motion.div)``

const TxLabel = styled.div`
  justify-content: items;
`

const TxlistCont = styled(motion.div)`
  overflow: hidden;
  padding: 0.5rem;
`

const listVars = {
  open: {
    height: 'auto'
  },
  closed: {
    height: 0
  }
}

const TxCol = styled.div`
  width:47%;
  @media ${mqs.small} {
    width:100%;
  }
`

const LastTxCol = styled(TxCol)`
  text-align: right;
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

const LeftLabel = styled.span`
  display: flex;
  display: inline;
  width: calc(100% - 30px);
  font-weight: ${metrics.fontWeight};
`

const TxInteractive = styled.span`
  display: block;
  margin-bottom: ${metrics.sep}rem;
`

const MinedAtLabel = styled(TxLabel)`
  margin-left: ${metrics.sep}rem;
`

const RightLabel = styled.span`
  display: flex;
  font-weight: ${metrics.fontWeight};
  margin-top: ${metrics.sep}rem;
  margin-bottom: ${metrics.sep}rem;
`

const BlockTime = styled.span`
  display: block;
  font-size: 0.95rem;
`

const TotalLabel = styled.span`
  font-weight: ${metrics.fontWeight};
`

// import styled from 'styled-components'
const TxBlock = ({ txData }) => {
  const [isOpen, togOpen] = useState(true)
  const { txid, input, output, blockTime } = txData
  const dt = DateTime.fromISO(blockTime)
  return (
    <TxBlockCont>
      <ListCont>
        <ListLabelCont>
          <TxLabel>
            <TxInteractive>
              <LeftLabel>Transaction:</LeftLabel>
            </TxInteractive>
            <RespHash hash={txid} />
          </TxLabel>
          <MinedAtLabel>
            <RightLabel>mined:</RightLabel>
            <BlockTime>{dt.toLocaleString(DateTime.DATETIME_MED)}</BlockTime>
          </MinedAtLabel>
        </ListLabelCont>
        <TxlistCont
          variants={listVars}
          animate={isOpen ? 'open' : 'closed'}
          initial='open'
          transition={{ duration: 0 }}
        >
          <TxColsCont>
            <TxCol>
              {input.length
                ? input.map((data, i) => <TxItem key={`inputItem-${i}}`} address={data.address} value={data.value} size={120} />)
                : <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            </TxCol>
            <TxColSep><IoMdArrowForward size={30} /></TxColSep>
            <TxCol>
              {output.map((data, i) => <TxItem key={`outputItem-${i}}`} address={data.address} value={data.value} size={120} />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
        <TxColsCont>
          <TxTogBt isOpen={isOpen} action={() => togOpen(!isOpen)}/>
          <LastTxCol>
            <TotalLabel>Total Inputs</TotalLabel> = {input.length}
          </LastTxCol>
          <TxColSep small/>
          <LastTxCol>
            <TotalLabel>Total Outputs</TotalLabel> = {output.length}
          </LastTxCol>
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
