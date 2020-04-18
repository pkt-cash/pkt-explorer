import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  ListLabelCont,
  ListCont,
  Pkt,
  TitleHeader,
  TitleCont,
  ListLabel,
  HashCont,
  AddrCont
} from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import Tooltip from '../Tooltip/Tooltip'
import Help from '../Help/Help'
import EaringChart, { Chartcont } from '../EarningChart/EarningChart'
import Copy from '../Copy/Copy'
import { Link } from 'react-router-dom'

import { commafy } from '../../utils'

import { Row, Column, ItemCont, Label, BrdCont, Content } from '../BlockStats/BlockStats'
const ListDataCont = styled.div`
  padding: ${metrics.padding}rem 0;
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

const ChartArea = styled.div`
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

const CpCont = styled.div`
  display: flex;
  align-items: center;
`

// TODO(cjd): copy-pasta
// In this particular case, lets ... the address because it will make everything look nicer
const AddrLink = styled(Link)`
  word-break: break-all;
  padding: 0.5rem;
  display: inline-block;
  font-weight: normal;
`

const nsLoadError = (nsError, x, f) => 
  (x) ? f(x) : (nsError) ? "Error loading data" : "Loading"

const nsBlock = ({ addr, meta, nsError, ns, nsFrontrunner }) =>
  <>
  <MetaCont>
    {meta.burned && parseFloat(meta.burned) > 0 &&
    <Row>
      <Column full>
        <ItemCont>
          <p><Label>
            Burned
            <Tooltip>
              The number of Network Steward coins which are nolonger accessible
              because they were not spent within 3 months of bring created.
            </Tooltip>
          </Label> <Content><Pkt amt={meta.burned}/></Content></p>
        </ItemCont>
      </Column>
    </Row>
    }

    <Row>
      <Column full>
        <ItemCont>
          <BrdCont>
            <p><Label>
              Votes for re-election
              <Tooltip>
                The amount of coins which are casting a vote against the Network Steward.
                If that amount is greater than 50% of all coins, then the Network Steward
                will be replaced.
              </Tooltip>
            </Label> <Content>{nsLoadError(nsError, ns, (ns) => (
              <Pkt amt={ns.votesAgainst}/>
            ))}</Content></p>
          </BrdCont>
        </ItemCont>
      </Column>
    </Row>

    <Row>
      <Column full>
        <ItemCont>
          <BrdCont>
            <p><Label>
              Votes needed
              <Tooltip>
                50% of the total coins in existance, what is needed to trigger a re-election.
              </Tooltip>
            </Label> <Content>{nsLoadError(nsError, ns, (ns) => (
              <Pkt amt={ns.votesNeeded}/>
            ))}</Content></p>
          </BrdCont>
        </ItemCont>
      </Column>
    </Row>

    <Row>
      <Column full>
        <ItemCont>
          <BrdCont>
            <p><Label>
              Current frontrunner
              <Tooltip>
                If more votes for election emerge but the candidates do not change, this is
                the candidate who would win. It is possible for the sitting Network Steward to
                win a re-election if it is unpopular yet more popular than any alternative.
              </Tooltip>
            </Label> <Content>{nsLoadError(nsError, nsFrontrunner, (nsFrontrunner) => (
              (nsFrontrunner.candidate === addr)
              ? "Same address (re-election)"
              : <AddrLink to={`/address/${nsFrontrunner.candidate}`}>{nsFrontrunner.candidate}</AddrLink>
            ))}</Content></p>
          </BrdCont>
        </ItemCont>
      </Column>
    </Row>

    <Row>
      <Column full>
        <ItemCont>
          <BrdCont>
            <p><Label>
              Network Steward charter
              <Tooltip>
                This is a page which explains the Network Steward, the timelines for grant
                applications and guidelines for applying.
              </Tooltip>
            </Label> <Content>{
              (addr === 'pkt1q6hqsqhqdgqfd8t3xwgceulu7k9d9w5t2amath0qxyfjlvl3s3u4sjza2g2') ?
              <a href="https://pkt.cash/steward">https://pkt.cash/steward</a> : "Unknown"
            }</Content></p>
          </BrdCont>  
        </ItemCont>
      </Column>
    </Row>

  </MetaCont>
</>

const AddrStats = ({ meta, addr, dailyTr, isNs, nsError, ns, nsFrontrunner }) => {
  const [chartEmpty, setEmpty] = useState(false)
  useEffect(() => {
    if (!dailyTr) return
    console.log('dailyTr', dailyTr)
    const isEmpty = dailyTr
      .map((tr) => tr[1] === 0)
      .reduce((prev, curr) => {
        if (prev === false) return prev
        else return curr
      })
    setEmpty(isEmpty)
  }, [dailyTr])
  return (<>
    <TitleCont>
      <div>
        <TitleHeader>
          {isNs ?
            'Network Steward' :
            'Address'
          }
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
          <Row>
            <Column full>
              <ItemCont>
                <BrdCont>
                  <p><Label>
                    Unspent count
                    <Tooltip>
                      The number of transactions which have been received and have not been spent.
                      Spending money involves grouping together a collection of transactions which were paid to you,
                      signing them to prove you are the rightful owner, then paying the result along to someone else.
                      If this number is over 1000 then you won't be able to send all of your money in one transaction
                      because otherwise it would become too large for the blockchain rules. Consider "folding coins"
                      (aka sending money to yourself) in order to reduce it.
                    </Tooltip>
                  </Label> <Content>{meta.balanceCount}</Content></p>
                </BrdCont>
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
        {isNs ?
          nsBlock({ addr, meta, nsError, ns, nsFrontrunner }) :
          <ChartArea>
            { chartEmpty
              ? <Chartcont>No mining income in the last 3 months</Chartcont>
              : dailyTr
                ? <EaringChart txData={dailyTr} />
                : 'Loading'}
          </ChartArea>
        }
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
