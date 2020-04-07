import React from 'react'
import { Chart } from 'react-charts'
import PropTypes from 'prop-types'
import { Chartcont } from '../EarningChart/EarningChart'

const TxChart = ({ txData, labelY }) => {
  const data = React.useMemo(
    () => [
      {
        label: labelY || 'tx/day',
        data: txData
      }
    ],
    [txData, labelY]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  )

  return (
    <Chartcont>
      <Chart
        data={data}
        axes={axes}
        series={series}
        tooltip />
    </Chartcont>
  )
}

TxChart.propTypes = {
  txData: PropTypes.array,
  labelY: PropTypes.string
}

// TxChart.defaultProps = {

// }

export default TxChart
