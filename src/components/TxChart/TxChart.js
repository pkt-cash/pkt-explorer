import React from 'react'
// import styled from 'styled-components'
import { Chart } from 'react-charts'
import PropTypes from 'prop-types'
const TxChart = ({ txData }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'tx/day',
        data: txData
      }
    ],
    [txData]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
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
    <div
      style={{
        width: '400px',
        height: '150px'
      }}
    >
      <Chart data={data} axes={axes} series={series} tooltip/>
    </div>
  )
}

TxChart.propTypes = {
  txData: PropTypes.array
}

// TxChart.defaultProps = {

// }

export default TxChart
