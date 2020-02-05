import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import TxChart from '../TxChart/TxChart'

console.log(mqs)

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
const StatsCont = styled.div`
  flex:2;
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
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
  width: 400px;
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

const StatRow = styled.div`
  display: flex;
  flex:1;
  align-items: center;
`
const StatCell = styled.div`
  display: flex;
  padding: 1rem;
  flex:1;
`

const StatCellLabel = styled.div`
  font-weight: 700;
  padding-right: 1rem;
`
const StatCellValue = styled.div`
  font-style: italic;
`

const HomeStats = ({ txData }) => {
  return (
    <ListCont>
      <ListLabelCont>
        HomeStats
      </ListLabelCont>
      <ListDataCont>
        <StatsCont>
          <StatRow>
            <StatCell>
              <StatCellLabel>Last block</StatCellLabel>
              <StatCellValue>6589</StatCellValue>
            </StatCell>
            <StatCell>
              <StatCellLabel>Last block height</StatCellLabel>
              <StatCellValue>123123</StatCellValue>
            </StatCell>
          </StatRow>
          <StatRow>
            <StatCell>
              <StatCellLabel>Last block</StatCellLabel>
              <StatCellValue>6589</StatCellValue>
            </StatCell>
            <StatCell>
              <StatCellLabel>Last block</StatCellLabel>
              <StatCellValue>6589</StatCellValue>
            </StatCell>
          </StatRow>
        </StatsCont>
        <ChartCont>
          {txData ? <TxChart txData={txData} /> : 'Loading'}
        </ChartCont>
      </ListDataCont>
    </ListCont>
  )
}

HomeStats.propTypes = {
  txData: PropTypes.array.isRequired
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default HomeStats
