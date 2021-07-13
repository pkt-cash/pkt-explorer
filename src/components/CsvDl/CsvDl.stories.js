import React from 'react'
import CsvDl from './CsvDl'
import { BtRow } from '../CommonComps/CommonComps'

export default {
  title: 'CsvDl',
  component: CsvDl
}

const dateRange = [
  new Date('2021-01-02'),
  new Date('2021-07-01')
];

export const CsvDlSt = () => <BtRow><CsvDl
  addr='pkt1q3rnwa8jw0ucs2qgxlrm06kfxwljlqxpzr85t9r30jv43fj7j29dquswyxt'
  dateRange={dateRange}
/></BtRow>

CsvDlSt.story = {
  name: 'CsvDl'
}
