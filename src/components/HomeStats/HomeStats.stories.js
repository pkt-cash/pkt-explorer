import React from 'react'
import HomeStats from './HomeStats'
import dummyTxData from '../../fixtures/packetcrypt_stats.json'
import { treatStats } from '../../utils'
const dData = treatStats(dummyTxData.results)
export default {
  title: 'HomeStats',
  component: HomeStats
}

export const HomeStatsSt = () => <HomeStats txData={dData} />

HomeStatsSt.story = {
  name: 'HomeStats'
}
