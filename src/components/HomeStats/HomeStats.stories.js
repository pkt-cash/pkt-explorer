import React from 'react'
import HomeStats from './HomeStats'
import dummyTxData from '../../fixtures/daily.json'
import { treatDTx } from '../../utils'  
const dData = treatDTx(dummyTxData.results)
export default {
  title: 'HomeStats',
  component: HomeStats
}

export const HomeStatsSt = () => <HomeStats txData={dData} />

HomeStatsSt.story = {
  name: 'HomeStats'
}
