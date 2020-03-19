import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  ListLabelCont,
  ListCont,
  Pkt,
  LeftCont,
  TitleHeader,
  TitleCont,
  ListLabel,
  HashCont
} from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import Tooltip from '../Tooltip/Tooltip'
import Help from '../Help/Help'

// import TxChart from '../TxChart/TxChart'
// import RespHash from '../RespHash/RespHash'
import EaringChart from '../EarningChart/EarningChart'
import Copy from '../Copy/Copy'

import { commafy } from '../../utils'

import { Row, Column, ItemCont, Label, BrdCont, Content } from '../BlockStats/BlockStats'
const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  }
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`
const MetaCont = styled.div`
  flex:1;
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  /* min-width: 50%; */
  @media ${mqs.small} {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0;
  }

`

const ChartCont = styled.div`
  /* flex: 1; */
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    min-height: 200px;
    display: flex;
    justify-content: center;
  }
`

// const StatRow = styled.div`
//   display: flex;
//   flex:1;
//   align-items: center;
// `
// const StatCell = styled.div`
//   display: flex;
//   padding: 1rem;
//   flex:1;
// `

// const StatCellLabel = styled.div`
//   font-weight: 700;
//   padding-right: 1rem;
// `
// const StatCellValue = styled.div`
//   font-style: italic;
// `

const BalanceLabel = styled.span`
  margin-right: 10px;
  font-size: 1.3rem;
  white-space: nowrap;
`

const AddrCont = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
`
const CpCont = styled.div`
  display: flex;
  align-items: center;
`

const AddrStats = ({ meta, addr, dailyTr }) => {
  return (<>
    <TitleCont>
      <div>
        <TitleHeader>
          Address
        </TitleHeader>
        <BalanceLabel>
          <Pkt amt={meta.balance}/>
        </BalanceLabel>
      </div>

      <AddrCont>
        <HashCont>
          {addr}
        </HashCont>
        <CpCont>
          <Copy value={addr}/>
        </CpCont>
      </AddrCont>
    </TitleCont>

    <ListCont>
      <ListLabelCont>
        <ListLabel>Summary</ListLabel>
      </ListLabelCont>
      <ListDataCont>
        <MetaCont>
          <Row>
            <Column full>
              <ItemCont>
                <p><Label>
                  Balance
                  <Tooltip>
                    The number of coins which this address has, confirmed in the blockchain
                  </Tooltip>
                </Label> <Content><Pkt amt={meta.balance}/></Content></p>
              </ItemCont>
            </Column>
          </Row>
          {meta.unconfirmedReceived && parseFloat(meta.unconfirmedReceived) > 0 &&
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Unconfirmed
                    <Tooltip>
                      The number of coins which are paid to this address in as-yet
                      unconfirmed transactions.
                    </Tooltip>
                  </Label> <Content><Pkt amt={meta.unconfirmedReceived}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          }
          {meta.burned && parseFloat(meta.burned) > 0 &&
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Burned
                    <Tooltip>
                      The number of coins which are inaccessible per consensus rules.
                      If you see this field, it means this is a
                      <Help.NetworkSteward>Network Steward</Help.NetworkSteward> address.
                    </Tooltip>
                  </Label> <Content><Pkt amt={meta.burned}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          }
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Transactions
                    <Tooltip>
                      The total number of transactions which this address has sent or received,
                      excluding mining payouts.
                    </Tooltip>
                  </Label> <Content>{commafy(meta.recvCount + meta.spentCount)}</Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Mining payouts
                    <Tooltip>
                      The total number of mining payouts which this address has received.
                    </Tooltip>
                  </Label> <Content>{commafy(meta.mineCount)}</Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Mined last 24h
                    <Tooltip>
                      The amount of coins which this address has mined in the last 24 hours.
                    </Tooltip>
                  </Label> <Content><Pkt amt={meta.mined24}/></Content></p>
                </BrdCont>
              </ItemCont>
            </Column>
          </Row>
        </MetaCont>
        <ChartCont>
          {dailyTr ? <EaringChart txData={dailyTr} /> : 'Loading'}
        </ChartCont>
      </ListDataCont>
    </ListCont>
  </>)
}

AddrStats.propTypes = {
  meta: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
  dailyTr: PropTypes.array.isRequired
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default AddrStats
