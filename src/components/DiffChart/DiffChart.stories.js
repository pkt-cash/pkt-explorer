import React from 'react'
import DiffChart from './DiffChart'
import dummyTxData from '../../fixtures/stats.json'
import { treatStats } from '../../utils'
const dData = treatStats(dummyTxData.results)

export default {
  title: 'DiffChart',
  component: DiffChart
}

export const DiffChartSt = () => <DiffChart txData={dData} />

DiffChartSt.story = {
  name: 'DiffChart'
}
