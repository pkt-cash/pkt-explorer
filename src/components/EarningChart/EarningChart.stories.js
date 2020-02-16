import React from 'react'
import EarningChart from './EarningChart'
import dummyTxData from '../../fixtures/income.json'
import { treatIncome } from '../../utils'
const dData = treatIncome(dummyTxData.result)

export default {
  title: 'EarningChart',
  component: EarningChart
}

export const EarningChartSt = () => <EarningChart txData={dData} />

EarningChartSt.story = {
  name: 'EarningChart'
}
