import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont, TitleCont, LeftCont, TitleHeader, ListLabel, Pkt } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import DiffChart from '../DiffChart/DiffChart'
import Loader from '../Loader/Loader'
import DataBlock from '../DataBlock/DataBlock'
import { bpsStr, commafy } from '../../utils'

const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  /* display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  } */
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`
const StatsCont = styled.div`
  flex:2;
  /* border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight}; */
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  @media ${mqs.small} {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0;
  }

`

const ChartCont = styled.div`
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
`

const LabelCont = styled.div`
  margin: 1rem 0.5rem;
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

const HomeStats = ({ blockList, txData, statsCoins }) => {
  const dailyD = useMemo(() => {
    if (!txData) { return false }
    const out = [
      { label: <><BandwidthEmoji/>Network Bandwidth</>, value: bpsStr(txData[0].data[0][1]) },
      { label: <><EPSEmoji/>Encryptions Per Second</>, value: commafy(txData[1].data[0][1]) }
    ];
    if (statsCoins) {
      out.push(
        { label: 'Difficulty', value: blockList ? commafy(Math.floor(blockList[0].difficulty)) : '' },
        { label: 'Mined To Date', value: <Pkt amt={statsCoins.alreadyMined}/> },
        { label: 'Current Block Reward', value: <Pkt amt={statsCoins.reward}/> },
        { label: 'Coins Remaining', value: <Pkt amt={statsCoins.remaining}/> }
      )
    }
    return out;
  })
  return (<>
    <TitleCont>
      <LeftCont>
        <TitleHeader>
          PKT Blockchain
        </TitleHeader>
      </LeftCont>
    </TitleCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>Stats</ListLabel>
      </ListLabelCont>
      {txData && txData.length
        ? <ListDataCont>
          <ChartCont>
            <DiffChart txData={txData} />
          </ChartCont>
          <DataBlock data={dailyD} />
        </ListDataCont>
        : <Loader text='Loading...' small />}
      <StatsCont>
      </StatsCont>
    </ListCont>
  </>)
}

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
