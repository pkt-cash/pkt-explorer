import React from 'react'
// import styled from 'styled-components'
import { Chart } from 'react-charts'
import PropTypes from 'prop-types'
// import { Chartcont } from '../EarningChart/EarningChart'
import styled from 'styled-components'
export const Chartcont = styled.div`
  min-height: 200px;
  min-width: 20px;
  width: 100%;
`

const DiffChart = ({ txData, labelY }) => {
  const data = React.useMemo(
    () => txData,
    [txData]
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

DiffChart.propTypes = {
  txData: PropTypes.array,
  labelY: PropTypes.string
}

// TxChart.defaultProps = {

// }

export default DiffChart
