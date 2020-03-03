import React from 'react'
import AddressStats from './AddressStats'
import dummyAddrData from '../../fixtures/addressMeta.json'
import dummyStwAddrData from '../../fixtures/addrMetaSteward.json'
import rawDailyData from '../../fixtures/income.json'
import rawDailyDataStw from '../../fixtures/incomeStw.json'
import { treatIncome } from '../../utils'
const addr = 'pkt1qkpuqg30wm0ju40yd4hyk7ehc48cy7mgj64xl7vxwt7mxxwqrt9qqetwlau'
const dailyData = treatIncome(rawDailyData.result)
const dailyDataStw = treatIncome(rawDailyDataStw.result)
// const dailyDataSt = treatIncome(dummyStwAddrData.result)

export default {
  title: 'AddressStats',
  component: AddressStats
}

export const AddressStatsSt = () => <AddressStats
  meta={dummyAddrData}
  addr={addr}
  dailyTr={dailyData}

/>
export const AddressStatsStwSt = () => <AddressStats
  meta={dummyStwAddrData}
  addr={addr}
  dailyTr={dailyDataStw}

/>

AddressStatsSt.story = {
  name: 'AddressStats'
}
AddressStatsStwSt.story = {
  name: 'AddressStats - steward'
}
