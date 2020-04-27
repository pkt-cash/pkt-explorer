import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// import PropTypes from 'prop-types'
import { MdFileDownload } from 'react-icons/md'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const Row = styled.div`
  /* margin-top: 1rem; */
  margin: 1rem;
  text-align: right;
`

const Label = styled.label`
  margin-left: 1rem;
`
const Sel = styled.select`
  font-size: 16px;
`

const DlBt = styled(motion.a)`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.pktGrey};
  display: inline-block;
  position: relative;
  top: 5px;
  /* bottom: 5px; */
  border-width: 0;
  color: #000;
  svg{
    width: 15px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: 2px;
    /* bottom: 1px; */
  }
`

const CheckCont = styled.span`
  margin-left: 1rem;
`

const CsvDl = ({ addr }) => {
  const curDate = new Date()
  const maxDate = new Date(new Date().setDate(curDate.getDate() - 1))
  const [mining, setMining] = useState('included')
  const [startDate, setStart] = useState([curDate, new Date()])
  const csvUrl = useMemo(() => `https://pkt.cash/api/v1/PKT/pkt/address/${addr}/income/${startDate[0].toISOString().replace(/T.*$/, '')}/${startDate[1].toISOString().replace(/T.*$/, '')}?mining=${mining}&csv=1`, [startDate, mining, addr])
  return (
    <Row>
      <DateRangePicker
        onChange={date => setStart(date)}
        value={startDate}
        maxDate={maxDate}
        clearIcon={null}
      />
      <CheckCont>
        <Label>mining income <input type="checkbox" id="miningInc" name="miningInc" value="miningInc" /></Label>
        <Label>non-mining income <input type="checkbox" id="nonMiningInc" name="nonMiningInc" value="nonMiningInc" /></Label>
      </CheckCont>
      {/* <Label> Mining <Sel name="mining" id="hall" value={mining} onChange={(e) => setMining(e.target.value)}>
        <option>included</option>
        <option>excluded</option>
        <option>only</option>
      </Sel>
      </Label> */}
      <DlBt
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        href={csvUrl}
        target='_blank'
        rel='noreferrer noopener'
      >
        <MdFileDownload />
      </DlBt>
      {/* <Row>
        <a href={csvUrl} target='_blank' rel='noreferrer noopener'><Button>Download Csv</Button></a>
      </Row> */}

    </Row>
  )
}

CsvDl.propTypes = {

}

CsvDl.defaultProps = {

}

export default CsvDl
