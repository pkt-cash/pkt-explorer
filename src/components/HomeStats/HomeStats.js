import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Pkt,
  mkTitle,
  TitleHeader,
} from '../CommonComps/CommonComps'
import { mkRow, mkTable, } from '../BlockStats/BlockStats'
import metrics from '../../theme/metrics'
import DiffChart from '../DiffChart/DiffChart'
import Loader from '../Loader/Loader'
import Tooltip from '../Tooltip/Tooltip'
import { bpsStr, commafy } from '../../utils'

const ChartCont = styled.div`
  margin: ${metrics.margin * 2}rem;
`

const BallEmoji = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  padding-right: 1em;
  margin-right: 0.3em;
  &::before { content:""; }
`
const BandwidthEmoji = styled(BallEmoji)`
  background-color: #4ab5eb;
`
const EPSEmoji = styled(BallEmoji)`
  background-color: #fc6868;
`

const stats = ({ blockList, txData, statsCoins }) =>
  <>
    <ChartCont>
      <DiffChart txData={txData} />
    </ChartCont>
    {mkTable(null, [
      mkRow(
        <>
          <BandwidthEmoji/>Network Bandwidth
          <Tooltip>
            An estimate of the amount of bandwidth currently being consumed
            for mining. This estimate is based on the number of announcements
            per block and the difference between the most valuable (newest)
            announcements and the least valuable (oldest). Since announcements
            can be re-used in multiple blocks, this estimate is not exact.
          </Tooltip>
        </>,
        bpsStr(txData[0].data[0][1] * 1000000)
      ),

      mkRow(
        <>
          Difficulty
          <Tooltip>
            This is the global difficulty of the blockchain, it is a unitless
            number but every time it doubles, it means there is twice as much
            announcement mining power, twice as much block mining power, twice
            as much bandwidth between announcement miners and block miners, or
            some combination of the three.
          </Tooltip>
        </>,
        blockList && commafy(Math.floor(blockList[0].difficulty))
      ),

      mkRow(
        <>
          Current Block Reward
          <Tooltip>
            How many new coins are paid out in each block.
          </Tooltip>
        </>,
        statsCoins && <Pkt amt={statsCoins.reward}/>
      ),
    ],[


      mkRow(
        <>
          <EPSEmoji/>Encryptions Per Second
          <Tooltip>
            This is the sum of the estimated encryptions per second expended
            by the announcement miners to mine the blocks plus the encryptions
            per second expended by the block miners. Since announcements can
            be re-used in multiple blocks, this estimate is not exact.
          </Tooltip>
        </>,
        commafy(txData[1].data[0][1] * 1000000)
      ),

      mkRow(
        <>
          Mined To Date
          <Tooltip>
            How many coins have already been mined.
          </Tooltip>
        </>,
        statsCoins && <Pkt amt={statsCoins.alreadyMined}/>
      ),

      mkRow(
        <>
          Coins Remaining
          <Tooltip>
            How many coins remain to be mined.
          </Tooltip>
        </>,
        statsCoins && <Pkt amt={statsCoins.remaining}/>
      ),
    ])}
  </>

const HomeStats = ({ blockList, txData, statsCoins }) => [
  mkTitle({ title: <TitleHeader>PKT Blockchain</TitleHeader> }),
  ((!txData || !txData.length) ? 
    <Loader text='Loading...' small /> :
    stats({ blockList, txData, statsCoins })
  ),
]

HomeStats.propTypes = {
  txData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  labelY: PropTypes.string
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default HomeStats
