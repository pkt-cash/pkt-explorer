import React from 'react'
import DataBlock from './DataBlock'

export default {
  title: 'DataBlock',
  component: DataBlock
}

const fakeData = [
  { label: 'test pkt', value: 1240000000, type: 'pkt' },
  { label: 'test hash', value: 'f2fcfb4bd866d220134261bdebc942c528c610f55848e28b3345d7e5dd9a7c59', type: 'hash' },
  { label: 'test num', value: 124 },
  { label: 'test text', value: 'toto' },
  { label: 'test num', value: 124 },
  { label: 'test text', value: 'toto' }
]

export const DataBlockSoloSt = () => <DataBlock data={[fakeData[0]]} />
export const DataBlockMultiSt = () => <DataBlock data={fakeData} />

DataBlockSoloSt.story = {
  name: 'data block 1 item'
}
DataBlockMultiSt.story = {
  name: 'data block multipleItems'
}
