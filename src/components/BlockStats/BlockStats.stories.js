import React from 'react'
import BlockStats from './BlockStats'
import dummyData from '../../fixtures/blockStats.json'

export default {
  title: 'BlockStats',
  component: BlockStats
}

export const BlockStatStLoad = () => <BlockStats />
export const BlockStatSt = () => <BlockStats stats={dummyData}/>

BlockStatStLoad.story = {
  name: 'Block stats are loading'
}
BlockStatSt.story = {
  name: 'Block stats are loaded'
}
