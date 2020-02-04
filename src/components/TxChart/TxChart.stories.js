import React from 'react'
import TxChart from './TxChart'
import dummyTxData from '../../fixtures/daily.json'
import { treatDTx } from '../../utils'
const dData = treatDTx(dummyTxData.results)

export default {
  title: 'TxChart',
  component: TxChart
}

export const TxChartSt = () => <TxChart txData={dData} />

TxChartSt.story = {
  name: 'TxChart'
}
