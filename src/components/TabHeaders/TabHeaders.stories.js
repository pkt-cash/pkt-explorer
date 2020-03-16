import React from 'react'
import TabHeaders from './TabHeaders'

const tabsData = [
  { name: 'Transactions' },
  { name: 'Daily income' },
  { name: 'bobibube Bahhh' },
  { name: 'bobibube Bahhh' }
]

export default {
  title: 'TabHeaders',
  component: TabHeaders
}

export const TabHeadersSt = () => <TabHeaders tabsData={tabsData} cTab={0} />

TabHeadersSt.story = {
  name: 'TabHeaders'
}
