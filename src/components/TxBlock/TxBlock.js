import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import metrics from '../../theme/metrics'
import { TxItem } from '../TxItem/Txitem'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import useResizeAware from 'react-resize-aware'
import TxTogBt from '../TxTogBt/TxTogBt'
import { IoMdArrowForward } from 'react-icons/io'
import RespHash from '../RespHash/RespHash'

const TxBlockCont = styled(motion.div)``

const TxLabel = styled.div`
  justify-content: items;
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
  @media ${metrics.mq.small} {
    width:100%;
  }
`
const LastTxCol = styled(TxCol)`
  text-align: right;
`

const ResizeCont = styled.div`
  position:relative;
  width: 100%;
  max-height:0;
`

const TxColsCont = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${metrics.mq.small} {
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
  @media ${metrics.mq.small} {
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
  const [isOpen, togOpen] = useState(false)
  const { txid, input, output, blockTime } = txData
  const [resizeListener, sizes] = useResizeAware()
  console.log('da size', sizes)
  return (
    <TxBlockCont>
      <ListCont>
        <ListLabelCont>
          <TxLabel>
            <TxInteractive>
              <TxTogBt isOpen={isOpen} action={() => togOpen(!isOpen)}/>
              <LeftLabel>Transaction:</LeftLabel>
            </TxInteractive>
            <RespHash hash={txid} size={sizes.width} />
          </TxLabel>
          <MinedAtLabel>
            <RightLabel>mined:</RightLabel>
            <BlockTime>{blockTime}</BlockTime>
          </MinedAtLabel>
        </ListLabelCont>
        <TxlistCont
          variants={listVars}
          animate={isOpen ? 'open' : 'closed'}
          initial='closed'
          transition={{ duration: 0.5, type: 'tween' }}
        >
          <TxColsCont>
            <TxCol>
              <ResizeCont>
                {resizeListener}
              </ResizeCont>
              {input.length
                ? input.map((data, i) => <TxItem key={`inputItem-${i}}`} address={data.address} value={data.value} size={sizes.width - 80} />)
                : <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            </TxCol>
            <TxColSep><IoMdArrowForward size={30} /></TxColSep>
            <TxCol>
              {output.map((data, i) => <TxItem key={`outputItem-${i}}`} address={data.address} value={data.value} size={sizes.width - 80} />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
        <TxColsCont>
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
