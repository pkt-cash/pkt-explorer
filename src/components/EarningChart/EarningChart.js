/* eslint-disable react/display-name */
import React from 'react'
import styled from 'styled-components'
import { Chart } from 'react-charts'
import PropTypes from 'prop-types'
import { mqs } from '../../theme/metrics'
export const Chartcont = styled.div`
width: 100%;
min-width: 400px;
min-height: 200px;
/* height: 100%; */
@media ${mqs.small} {
  min-width: auto;
  width: 100%;
}
`

const EaringChart = ({ txData }) => {
  const data = React.useMemo(
    () => [
      {
        label: 'earning/day',
        data: txData
      }
    ],
    [txData]
  )

  const tooltip = React.useMemo(
    () => ({
      render: (props) => {
        return <CustomTooltip {...props} />
      }
    }),
    []
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
        tooltip={tooltip} />
    </Chartcont>
  )
}

EaringChart.propTypes = {
  txData: PropTypes.array
}

// TxChart.defaultProps = {

// }

export default EaringChart

const CustomTooltip = ({ datum }) => {
  let date = ''
  if (datum) {
    const dt = datum.primary
    date = `date: ${dt.getDate()}-${dt.getMonth() + 1}-${dt.getYear() + 1900}`
  }
  return <div>
    {datum ? date : ''}<br/>
    {datum ? `earning: ${parseFloat(datum.secondary).toFixed(2)} PKT` : ''}
  </div>
}

CustomTooltip.propTypes = {
  datum: PropTypes.shape({
    primary: PropTypes.object.isRequired,
    secondary: PropTypes.number.isRequired
  })
}
