import React from 'react'
import BlockStat from './BlockStat'
import dummyData from '../../fixtures/blockList.json'

export default {
  title: 'BlockStat',
  component: BlockStat
}

export const BlockStatStLoad = () => <BlockStat />
export const BlockStatSt = () => <BlockStat listData={dummyData.results}/>

BlockStatStLoad.story = {
  name: 'Block stats is loading'
}
BlockStatSt.story = {
  name: 'Block stats are loaded'
}
