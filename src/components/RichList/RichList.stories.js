import React from 'react'
import RichList from './RichList'
import dummyData from '../../fixtures/richList.json'

export default {
  title: 'RichList',
  component: RichList
}

export const RichListStLoad = () => <RichList />
export const RichListSt = () => <RichList listData={dummyData}/>

RichListStLoad.story = {
  name: 'Richlist loading'
}
RichListSt.story = {
  name: 'Richlist loaded'
}
