import React from 'react'
import BlockList from './BlockList'
import dummyData from '../../fixtures/blockList.json'

export default {
  title: 'BlockList',
  component: BlockList
}

export const BlockListStLoad = () => <BlockList />
export const BlockListSt = () => <BlockList listData={dummyData.results}/>

BlockListStLoad.story = {
  name: 'Blocklist loading'
}
BlockListSt.story = {
  name: 'Blocklist loaded'
}
