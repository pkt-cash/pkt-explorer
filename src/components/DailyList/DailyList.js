import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { displayPKT } from '../../utils'

const ListCont = styled.div`
padding: 1rem;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0.5rem;
  ${({ head }) => head && css`font-weight: 700;`}
  :nth-child(2n + 2) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
`

const DailyItem = ({ data }) => {
  const dt = DateTime.fromJSDate(data[0])
  console.log(dt)
  return <Row>
    <div>{dt.toLocaleString(DateTime.DATE_MED)}</div>
    <div>{data[1]} / {displayPKT(data[1])}</div>
  </Row>
  // return <div>{data[0]} {data[1]}</div>
}

function DailyList ({ dData }) {
  return <ListCont>
    <Row head>
      <div>Day</div>
      <div>Amount</div>
    </Row>
    {dData.map((data, i) => <DailyItem data={data} key={`dataRow-${i}`}/>)}
  </ListCont>
}

DailyList.propTypes = {
  dData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ])
}

DailyList.defaultProps = {

}

export default DailyList
