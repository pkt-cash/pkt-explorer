import React from 'react'
import DailyList from './DailyList'
import { treatDTx } from '../../utils'
import dummyD from '../../fixtures/daily.json'

const tabsData = treatDTx(dummyD.results)

export default {
  title: 'DailyList',
  component: DailyList
}

export const DailyListSt = () => <DailyList dData={tabsData} />

DailyListSt.story = {
  name: 'DailyList'
}
