import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  ListLabelCont,
  ListCont,
  Pkt,
  TitleHeader,
  ListLabel,
  AddrLink,
  mkTitle
} from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import Tooltip from '../Tooltip/Tooltip'
import EaringChart from '../EarningChart/EarningChart'

import { commafy } from '../../utils'

import { mkRow, mkTable } from '../BlockStats/BlockStats'

const ListDataCont = styled.div`
  padding: ${metrics.padding}rem 0;
  display: flex;
  @media ${mqs.medium} {
    flex-direction: column;
  }
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`

const MetaCont = styled.div`
  flex:1;
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  /* min-width: 50%; */
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
  @media ${mqs.medium} {
    /*chart is at the bottom now*/
    border-right-width: 0;
  }
  @media ${mqs.small} {
    margin-right: 0;
    padding-right: 0;
  }


  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.pktTableBorder};
  }
  & > div:last-child {
    border-bottom: 0;
  }
`

const ChartArea = styled.div`
  /* flex: 1; */
  min-width: 400px;
  @media ${mqs.small} {
    min-width: 100px;
    text-align: center;
    width: 100%;
    min-height: 200px;
    display: flex;
    justify-content: center;
  }
`

const BalanceLabel = styled.span`
  margin-right: 10px;
  font-size: 1.3rem;
  white-space: nowrap;
  display: inline-block;
`

const NoMiningCont = styled.div`
  /* background-color: #f00; */
  display: flex;
  min-width: 400px;
  min-height: 200px;
  font-weight: 600;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0.5;
  @media ${mqs.medium} {
    min-width: auto;
    min-height: auto;
    width: 100%;
    height: auto;
  }
`

const nsLoadError = (nsError, x, f) =>
  (x) ? f(x) : (nsError) ? 'Error loading data' : 'Loading'

const nsBlock = ({ addr, meta, nsError, ns, nsFrontrunner }) => [
  meta.burned && parseFloat(meta.burned) > 0 && mkRow(
    <>
      Burned
      <Tooltip>
        The number of Network Steward coins which are nolonger accessible
        because they were not spent within 3 months of bring created.
      </Tooltip>
    </>,
    <Pkt amt={meta.burned}/>
  ),

  mkRow(
    <>
      Votes for re-election
      <Tooltip>
        The amount of coins which are casting a vote against the Network Steward.
        If that amount is greater than 50% of all coins, then the Network Steward
        will be replaced.
      </Tooltip>
    </>,
    nsLoadError(nsError, ns, (ns) => (
      <Pkt amt={ns.votesAgainst}/>
    ))
  ),

  mkRow(
    <>
      Votes needed
      <Tooltip>
      50% of the total coins in existance, what is needed to trigger a re-election.
      </Tooltip>
    </>,
    nsLoadError(nsError, ns, (ns) => (
      <Pkt amt={ns.votesNeeded}/>
    ))
  ),

  mkRow(
    <>
      Current frontrunner
      <Tooltip>
        If more votes for election emerge but the candidates do not change, this is
        the candidate who would win. It is possible for the sitting Network Steward to
        win a re-election if it is unpopular yet more popular than any alternative.
      </Tooltip>
    </>,
    nsLoadError(nsError, nsFrontrunner, (nsFrontrunner) => (
      (nsFrontrunner.candidate === addr)
        ? 'Same address (re-election)'
        : <AddrLink to={`/address/${nsFrontrunner.candidate}`} nsLink>{nsFrontrunner.candidate}</AddrLink>
    ))
  ),

  mkRow(
    <>
      Network Steward charter
      <Tooltip>
        This is a page which explains the Network Steward, the timelines for grant
        applications and guidelines for applying.
      </Tooltip>
    </>,
    (addr === 'pkt1q6hqsqhqdgqfd8t3xwgceulu7k9d9w5t2amath0qxyfjlvl3s3u4sjza2g2')
        ? <a href="https://pkt.cash/network-steward">https://pkt.cash/network-steward</a> : 'Unknown'
  ),
]

const addrInfo = ({ meta, addr }) => [
  mkRow(
    <>
      Balance
      <Tooltip>
        The number of coins which this address has, confirmed in the blockchain
      </Tooltip>
    </>,
    <Pkt amt={meta.balance}/>
  ),

  mkRow(
    <>
      Unconsolidated Txns
      <Tooltip>
        Whenever you receive coins it is like getting a check, when you're mining this
        happens once per block. This addresses balance is comprised
        of {meta.balanceCount} "checks" but they can only
        spend {(addr.indexOf('pkt1') === 0) ? 1200 : 500} at a time. You can group your
        coins together by <em>folding</em>, i.e. sending coins to yourself.
      </Tooltip>
    </>,
    meta.balanceCount
  ),

  meta.unconfirmedReceived && parseFloat(meta.unconfirmedReceived) > 0 && mkRow(
    <>
      Unconfirmed
      <Tooltip>
        The number of coins which are paid to this address in as-yet
        unconfirmed transactions.
      </Tooltip>
    </>,
    <Pkt amt={meta.unconfirmedReceived}/>
  ),

  mkRow(
    <>
      Transactions
      <Tooltip>
        The total number of transactions which this address has sent or received,
        excluding mining payouts.
      </Tooltip>
    </>,
    commafy(meta.recvCount + meta.spentCount)
  ),

  mkRow(
    <>
      Mining payouts
      <Tooltip>
        The total number of mining payouts which this address has received.
      </Tooltip>
    </>,
    commafy(meta.mineCount)
  ),

  mkRow(
    <>
      Mined last 24h
      <Tooltip>
        The amount of coins which this address has mined in the last 24 hours.
      </Tooltip>
    </>,
    <Pkt amt={meta.mined24}/>
  )
]

const AddressCont = styled.div`
  word-break: break-all;
  -webkit-text-size-adjust: none;

  white-space: nowrap;
  @media ${mqs.large} {
    white-space: normal;
  }
`

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
    {mkTitle({
      title: <div>
        <TitleHeader>
          {isNs
            ? 'Network Steward'
            : 'Address'
          }
        </TitleHeader>
        <BalanceLabel>
          <Pkt amt={meta.balance}/>
        </BalanceLabel>
      </div>,
      handle: <AddressCont>{addr}</AddressCont>,
      copy: addr,
    })}

    {isNs && mkTable(
        'Summary',
        addrInfo({meta, addr}),
        nsBlock({ addr, meta, nsError, ns, nsFrontrunner })
    )}
    
    {!isNs &&
      <ListCont>
        <ListLabelCont>
          <ListLabel>Summary</ListLabel>
        </ListLabelCont>
        <ListDataCont>
          <MetaCont>{addrInfo({meta, addr})}</MetaCont>
          { chartEmpty && <NoMiningCont>No mining income in the last 3 months</NoMiningCont> }
          { !chartEmpty && (dailyTr ?
            <ChartArea><EaringChart txData={dailyTr} /></ChartArea> :
            <NoMiningCont>Loading</NoMiningCont>
          )}
        </ListDataCont>
      </ListCont>
    }
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
