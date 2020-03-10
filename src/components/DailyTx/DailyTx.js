import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'
import { treatDTx } from '../../utils'
import TxChart from '../TxChart/TxChart'
import { ListCont } from '../CommonComps/CommonComps'
import metrics from '../../theme/metrics'
// import DataBlock from '../DataBlock/DataBlock'

const Header = styled.div`
  padding: ${metrics.padding}rem;
  font-size: ${metrics.headerFontSize}rem;
  font-weight: ${metrics.fontWeight};
  border-bottom: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  p{
    font-weight: 400;
  }
`

const ChartCont = styled.div`
  padding: ${metrics.padding}rem;
`

const DailyTx = ({ txData }) => {
  const modData = useMemo(() => {
    return txData ? treatDTx(txData) : false
  }, [txData])

  const lastData = useMemo(() => {
    if (!txData) return false
    return txData[txData.length - 1].transactionCount
  }, [txData])
  return modData
    ? <ListCont>
      <Header>
        Daily Transaction Chart
      </Header>
      <ChartCont>
        {lastData && <p>
          {lastData} pkt transactions confirmed over last 24 hours
        </p>}
        <TxChart txData={modData} />
      </ChartCont>
      {/* {lastData && <DataBlock data={lastData}/>} */}
    </ListCont>
    : <Loader text='Loading daily transaction data' />
}

DailyTx.propTypes = {
  txData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]).isRequired
}

DailyTx.defaultProps = {

}

export default DailyTx
