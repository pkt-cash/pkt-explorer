import React, { useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// import PropTypes from 'prop-types'
import { MdFileDownload } from 'react-icons/md'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const Row = styled.div`
  /* margin-top: 1rem; */
  margin: 0 1rem 0 0;
  text-align: right;
  padding-right:9px;
`

const Label = styled.label`
  margin-left: 1rem;
`
// const Sel = styled.select`
//   font-size: 16px;
// `

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
  ${({ isDisabled }) => isDisabled && css`
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  `}
`

const CheckCont = styled.span`
  /* margin-left: 1rem; */
`

const LabelCont = styled.span`
  margin-right: 1rem;
`

function getMiningFlag (mineCheck, nonMineCheck) {
  // console.log('mineCheck', mineCheck)
  // console.log('nonMineCheck', nonMineCheck)
  let miningFlag
  if (mineCheck && nonMineCheck) {
    miningFlag = 'included'
  } else if (mineCheck) miningFlag = 'only'
  else miningFlag = 'excluded'
  // console.log('miningFlag', miningFlag)
  return miningFlag
}

const CsvDl = ({ addr, dateRange, setDateRange }) => {
  const maxDate = new Date(new Date().setDate((new Date()).getDate() - 1))
  const [mining, setMining] = useState(true)
  const [nonMining, setNonMining] = useState(false)
  const [miningFlag, setMiningFlag] = useState('only')
  function setMiningState (e) {
    const tar = e.target.value
    switch (tar) {
      case 'miningInc':
        setMiningFlag(getMiningFlag(!mining, nonMining))
        setMining(!mining)
        break
      case 'nonMiningInc':
        setMiningFlag(getMiningFlag(mining, !nonMining))
        setNonMining(!nonMining)
        break
      default:
        break
    }
  }

  const csvUrl = useMemo(() => `https://pkt.cash/api/v1/PKT/pkt/address/${addr}/income/${dateRange[0].toISOString().replace(/T.*$/, '')}/${dateRange[1].toISOString().replace(/T.*$/, '')}?mining=${miningFlag}&csv=1`, [dateRange, miningFlag, addr])
  // console.log('csvUrl', csvUrl)
  return (
    <Row>
      <LabelCont>Export</LabelCont>
      <DateRangePicker
        onChange={date => setDateRange(date)}
        value={dateRange}
        maxDate={maxDate}
        clearIcon={null}
      />
      <CheckCont>
        <Label><input type="checkbox" id="miningInc" name="miningInc" value="miningInc" onChange={setMiningState} checked={mining}/> Mining Income</Label>
        <Label><input type="checkbox" id="nonMiningInc" name="nonMiningInc" value="nonMiningInc" onChange={setMiningState} checked={nonMining}/> Non-mining Income</Label>
      </CheckCont>
      {/* <Label> Mining <Sel name="mining" id="hall" value={mining} onChange={(e) => setMining(e.target.value)}>
        <option>included</option>
        <option>excluded</option>
        <option>only</option>
      </Sel>
      </Label> */}
      {(mining === false && nonMining === false)
        ? <DlBt isDisabled
          alt='one of the checkboxes should be clicked'
        >
          <MdFileDownload />
        </DlBt>
        : <DlBt
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          href={(mining === false && nonMining === false) ? '' : csvUrl}
          target='_blank'
          rel='noreferrer noopener'
          disabled={(mining === false && nonMining === false)}
          isDisabled={(mining === false && nonMining === false)}
        >
          <MdFileDownload />
        </DlBt>
      }
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
