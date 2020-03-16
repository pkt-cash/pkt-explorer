import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaClock, FaCheckCircle } from 'react-icons/fa'
import metrics, { mqs } from '../../theme/metrics'
import { TxItem } from '../TxItem/Txitem'
import { ClickableListLabelCont, ListCont, LeftCont, RightCont } from '../CommonComps/CommonComps'
import { IoMdArrowForward } from 'react-icons/io'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { Pkt } from '../CommonComps/CommonComps'

const AddrTxBlockCont = styled.div`
  border-bottom: solid 2px ${({ theme }) => theme.colors.pktGrey};
`

// TODO(cjd): No idea why line-height: 2em; is needed to center the text
const BlockHeaderCont = styled(ClickableListLabelCont)`
    line-height: 2em;
    padding: 0.5rem;
`

const TxLabel = styled.div`
  justify-content: items;
`

const AmountLabel = styled(TxLabel)`
  padding-right: 1em;
  ${props => (props.direction === '+') ? 'color: green;': ''}
`  

// TODO(cjd): expand on click?
const TxlistCont = styled.div`
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

const InfoCont = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  background-color: #f8f8f8;
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
  width: calc(100% - 30px);
  font-weight: ${metrics.fontWeight};
`

const TxInteractive = styled.span`
  display: block;
  margin-bottom: ${metrics.sep}rem;
`

const TxLastCont = styled.div`
  margin-right: 10px
`

const MinedAtLabel = styled.a/*TODO(cjd): (Link)*/`
  margin-left: ${metrics.sep}rem;
  display: flex;
  align-items: flex-start;
  @media ${mqs.small} {
    margin: 1rem 0 0 0;
    justify-content: end;
  }
`

const RightLabel = styled.span`
  font-weight: normal;
`

const TotalLabel = styled.span`
  font-weight: ${metrics.fontWeight};
  display: flex;
  flex-flow: row nowrap;
  align-items: center
`

const TxSmallLabel = styled.div`
  display: none;
  @media ${mqs.small} {
    display: block;
  }
`

const IcnCont = styled.span`
  margin-left: 5px;
  padding-top:2px;
`

const AddrLink = styled(Link)`
  word-break: break-all;
  display: inline-block;
  font-weight: normal;
`

const ConfIcn = ({ isConf }) => {
  return <IcnCont>{isConf
    ? <FaCheckCircle title="Confirmed" style={{ color: 'green' }} />
    : <FaClock title="Unconfirmed" style={{ color: '#dd8335' }} />}
  </IcnCont>
}

// import styled from 'styled-components'
const AddrTxBlock = ({ txData, myAddr }) => {
  const { txid, input, output, blockTime, firstSeen } = txData
  const dt = DateTime.fromISO(blockTime)
  const fs = DateTime.fromISO(firstSeen)

  let value = '0';
  let direction = '';
  let maxValue = 0;
  let counterparty = '';
  let others = 0;
  for (const inp of input) {
    console.log(Number(inp.value), inp.address);
    if (inp.address === myAddr) {
      value = inp.value;
      direction = '-';
    } else if (Number(inp.value) > maxValue) {
      others += (counterparty !== '');
      counterparty = inp.address;
      maxValue = Number(inp.value);
    }
  }
  if (direction === "") {
    for (const out of output) {
      console.log(Number(out.value), out.address);
      if (out.address === myAddr) {
        value = out.value;
        direction = '+';
      }
    }
  } else {
    maxValue = 0;
    counterparty = '';
    others = 0;
    for (const out of output) {
      if (Number(out.value) > maxValue) {
        others += (counterparty !== '');
        counterparty = out.address;
        maxValue = Number(out.value);
      }
    }
  }

  return (
    <AddrTxBlockCont>
      <ListCont>
        <BlockHeaderCont>
          <LeftCont>
            <AmountLabel direction={direction}>
              {direction}<Pkt amt={value}/>
            </AmountLabel>
          </LeftCont>
          <LeftCont>
            <AddrLink to={`/address/${counterparty}`}>
              {counterparty}
            </AddrLink>
            {/* {(others > -1) ? /// TODO(cjd): Need to get this to look pretty
                <TxLabel>And {others} others...</TxLabel> : ""
            } */}
          </LeftCont>
          <RightCont>
            <MinedAtLabel href={`https://pkt-insight.cjdns.fr/#/PKT/pkt/tx/${txid}`}>
                {blockTime
                ? <><RightLabel>{dt.toLocaleString(DateTime.DATETIME_MED)}</RightLabel><ConfIcn isConf /></>
                : <><RightLabel>{fs.toLocaleString(DateTime.DATETIME_MED)}</RightLabel><ConfIcn /></>
                }
            </MinedAtLabel>
          </RightCont>
        </BlockHeaderCont>
        <TxlistCont>
          <TxColsCont>
            <TxSmallLabel>input</TxSmallLabel>
            <TxCol>
              {(()=> {
                if (input && input.length) {
                  return input.map((data, i) => (
                    <TxItem
                      key={`inputItem-${i}}`}
                      address={data.address}
                      value={data.value}
                      size={120}
                    />
                  ));
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
              {output && output.map((data, i) => <TxItem unconfirmed={blockTime === undefined} key={`outputItem-${i}}`} address={data.address} value={data.value} size={120} />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
      </ListCont>
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
