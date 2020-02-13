import React from 'react'
import TxTogBt from './TxTogBt'
import dummyTxData from '../../fixtures/blockCoins.json'

const dData = dummyTxData.results[0]

export default {
  title: 'TxTogBt',
  component: TxTogBt
}

export const TxTogBtSt = () => <TxTogBt isOpen={true} />

TxTogBtSt.story = {
  name: 'TxTogBt'
}
