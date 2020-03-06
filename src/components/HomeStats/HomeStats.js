import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import DiffChart from '../DiffChart/DiffChart'
import Loader from '../Loader/Loader'
import DataBlock from '../DataBlock/DataBlock'
import { byteStr } from '../../utils'

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

const HomeStats = ({ txData, labelY }) => {
  const dailyD = useMemo(() => txData
    ? [
      { label: 'bps', value: byteStr(txData[0].data[0][1]) },
      { label: 'eps', value: byteStr(txData[1].data[0][1]) }
    ]
    : false
  )
  return (
    <ListCont>
      <ListLabelCont>
      PacketCrypt stats
      </ListLabelCont>
      {txData
        ? <ListDataCont>
          <ChartCont>
            <DiffChart txData={txData} />
          </ChartCont>
          <LabelCont>Daily stats</LabelCont>
          <DataBlock data={dailyD} />
        </ListDataCont>
        : <Loader text='Loading...' small />}
      <StatsCont>
      </StatsCont>
    </ListCont>
  )
}

HomeStats.propTypes = {
  txData: PropTypes.array.isRequired,
  labelY: PropTypes.string
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default HomeStats
