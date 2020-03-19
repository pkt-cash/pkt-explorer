import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaClock, FaCheckCircle } from 'react-icons/fa'
import { mqs } from '../../theme/metrics'
import { TxItem } from '../TxItem/Txitem'
import { ListLabelCont, Pkt, NoWrap } from '../CommonComps/CommonComps'
import { IoMdArrowForward } from 'react-icons/io'
import { DateTime } from 'luxon'
import TxTogBt from '../TxTogBt/TxTogBt'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const listVars = {
  open: {
    height: 'auto'
  },
  closed: {
    height: 0
  }
}

const RightCont = styled.div`
  align-items: flex-start;
  display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

const AddrTxBlockCont = styled.div`
  border-bottom: solid 2px ${({ theme }) => theme.colors.pktGrey};
`

// TODO(cjd): No idea why line-height: 2em; is needed to center the text
const BlockHeaderCont = styled(ListLabelCont)`
    /* line-height: 2em; */
    padding: 0.5rem;
    ${mqs.small} {
      flex-direction: column;
    }
`

const PktCont = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  *{
    white-space: nowrap;
  }
`

const TxLabel = styled.div`
  justify-content: items;
`

const AmountLabel = styled(TxLabel)`
  padding-right: 0.5em;
  ${props => (props.direction === '+') ? 'color: green;' : ''}
`

// TODO(cjd): expand on click?
const TxlistCont = styled(motion.div)`
  overflow: hidden;
  padding: 0  0.5rem;
`

const TxCol = styled.div`
  width:47%;
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
  align-items: baseline;
  text-align: center;
  @media ${mqs.small} {
    display: none;
  }
`

const MinedAtLabel = styled(Link)`
  /* display: flex; */
  /* align-items: flex-start; */
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 3px;
  background: #eee;
  white-space: nowrap;
  @media ${mqs.small} {
    /* margin: 1rem 0 0 0; */
    /* justify-content: end; */
  }
`

const RightLabel = styled.span`
  font-weight: normal;
`

const TxSmallLabel = styled.div`
  display: none;
  @media ${mqs.small} {
    display: block;
  }
`

const IcnCont = styled.span`
  margin-right: 5px;
  padding-top:2px;
  position: relative;
  top:2px;
`

const AddrLink = styled(Link)`
  word-break: break-all;
  padding: 0.5rem;
  display: inline-block;
  font-weight: normal;
`

const ConfIcn = ({ isConf }) => {
  return <IcnCont>{isConf
    ? <FaCheckCircle title="Confirmed" style={{ color: 'green' }} />
    : <FaClock title="Unconfirmed" style={{ color: '#dd8335' }} />}
  </IcnCont>
}

const AddrTxBlock = ({ txData, myAddr }) => {
  const [isOpen, setOpen] = useState(false)
  const { txid, input, output, blockTime, firstSeen } = txData
  const dt = DateTime.fromISO(blockTime)
  const fs = DateTime.fromISO(firstSeen)

  let value = '0'
  let direction = ''
  let maxValue = 0
  let counterparty = ''
  let others = 0
  for (const inp of input) {
    if (inp.address === myAddr) {
      value = inp.value
      direction = '-'
      continue
    }
    maxValue = Math.max(Number(inp.value), maxValue)
    others += (counterparty !== '')
    counterparty = inp.address
  }
  if (direction === '') {
    for (const out of output) {
      if (out.address === myAddr) {
        value = out.value
        direction = '+'
      }
    }
  } else {
    maxValue = 0
    counterparty = ''
    others = 0
    for (const out of output) {
      if (out.address === myAddr) {
        // This is when we receive change back, we need to deduct from the
        // amount that we're spending to get the right sum.
        value = '' + (Number(value) - out.value)
        continue
      }
      maxValue = Math.max(Number(out.value), maxValue)
      others += (counterparty !== '')
      counterparty = out.address
    }
  }

  return (
    <AddrTxBlockCont>

      <BlockHeaderCont onClick={() => setOpen(!isOpen)}>
        <RightCont>
          <MinedAtLabel to={`/tx/${txid}`}>
            {blockTime
              ? <><ConfIcn isConf /><RightLabel>{dt.toLocaleString(DateTime.DATETIME_MED)}</RightLabel></>
              : <><ConfIcn /><RightLabel>{fs.toLocaleString(DateTime.DATETIME_MED)}</RightLabel></>
            }
          </MinedAtLabel>
          <span>
            <AddrLink to={`/address/${counterparty}`}>
              {counterparty}
            </AddrLink>
            <NoWrap>
              {(others > 0) ? ` +${others} others...` : ''}
            </NoWrap>
          </span>
        </RightCont>
        <PktCont>
          <AmountLabel direction={direction}>
            {direction}<Pkt amt={value}/>
          </AmountLabel>
          <TxTogBt isOpen={isOpen} action={() => setOpen(!isOpen)}/>
        </PktCont>
      </BlockHeaderCont>
      <TxlistCont
        variants={listVars}
        animate={isOpen ? 'open' : 'closed'}
        initial='open'
        transition={{ duration: 0.1 }}
      >
        <TxColsCont>
          <TxSmallLabel>input</TxSmallLabel>
          <TxCol>
            {(() => {
              if (input && input.length) {
                return input.map((data, i) => (
                  <TxItem
                    key={`inputItem-${i}}`}
                    address={data.address}
                    value={data.value}
                    size={120}
                    inputs={data.spentcount}
                  />
                ))
              } else if (!blockTime) {
                return <TxItem txt='Unconfirmed - Inputs Unavailable' />
              } else {
                return <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            })()}
          </TxCol>
          <TxColSep><IoMdArrowForward size={30} /></TxColSep>
          <TxSmallLabel>output</TxSmallLabel>
          <TxCol>
            {output &&
              output.map((data, i) => (
                <TxItem
                  spent={data.spentcount > 0}
                  key={`outputItem-${i}}`}
                  address={data.address}
                  value={data.value}
                  size={120} />
              ))
            }
          </TxCol>
        </TxColsCont>
      </TxlistCont>

    </AddrTxBlockCont>
  )
}

AddrTxBlock.propTypes = {
  txData: PropTypes.shape({
    txid: PropTypes.string.isRequired,
    blockTime: PropTypes.string.isRequired,
    input: PropTypes.array.isRequired,
    output: PropTypes.array.isRequired
  }).isRequired
}

export default AddrTxBlock
