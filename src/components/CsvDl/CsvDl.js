import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Button } from '../CommonComps/CommonComps'

const Row = styled.div`
  margin-top: 1rem;
`

const Label = styled.label`
  margin-left: 1rem;
`

const CsvDl = ({ addr }) => {
  const curDate = new Date()
  const maxDate = new Date(new Date().setDate(curDate.getDate() - 1))
  const [mining, setMining] = useState('included')
  const [startDate, setStart] = useState([curDate, new Date()])
  const csvUrl = useMemo(() => `https://pkt.cash/api/v1/PKT/pkt/address/${addr}/income/${startDate[0].toISOString().replace(/T.*$/, '')}/${startDate[1].toISOString().replace(/T.*$/, '')}?mining=${mining}&csv=1`, [startDate, mining, addr])
  console.log(csvUrl)
  return (
    <Row>
      <DateRangePicker
        onChange={date => setStart(date)}
        value={startDate}
        maxDate={maxDate}
        clearIcon={null}
      />
      <Label> Mining <select name="mining" id="hall" value={mining} onChange={(e) => setMining(e.target.value)}>
        <option>included</option>
        <option>excluded</option>
        <option>only</option>
      </select>
      </Label>
      <Row>
        <a href={csvUrl} target='_blank' rel='noreferrer noopener'><Button>Download Csv</Button></a>
      </Row>

    </Row>
  )
}

CsvDl.propTypes = {

}

CsvDl.defaultProps = {

}

export default CsvDl
