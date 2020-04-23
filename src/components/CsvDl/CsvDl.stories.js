import React from 'react'
import CsvDl from './CsvDl'
import { BtRow } from '../CommonComps/CommonComps'

export default {
  title: 'CsvDl',
  component: CsvDl
}

export const CsvDlSt = () => <BtRow><CsvDl addr='pkt1q3rnwa8jw0ucs2qgxlrm06kfxwljlqxpzr85t9r30jv43fj7j29dquswyxt' /></BtRow>

CsvDlSt.story = {
  name: 'CsvDl'
}
