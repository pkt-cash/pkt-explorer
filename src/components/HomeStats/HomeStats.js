import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import metrics from '../../theme/metrics'
import TxChart from '../TxChart/TxChart'
import { dData } from '../TxChart/TxChart.stories'

const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  display: flex;
`
const StatsCont = styled.div`
  flex:2;
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
`

const ChartCont = styled.div`
  width: 400px;
`

const HomeStats = ({ txData }) => {
  return (
    <ListCont>
      <ListLabelCont>
        HomeStats
      </ListLabelCont>
      <ListDataCont>
        <StatsCont>
          Stats
        </StatsCont>
        <ChartCont>
          {dData ? <TxChart txData={txData} /> : 'Loading'}
        </ChartCont>

      </ListDataCont>
    </ListCont>
  )
}

HomeStats.propTypes = {
  txData: PropTypes.array.isRequired,
}

// HomeStats.defaultProps = {

// }

export default HomeStats
