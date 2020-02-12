import React from 'react'
import TxBlock from './TxBlock'
import dummyTxData from '../../fixtures/blockCoins.json'
// import { treatDTx } from '../../utils'

const dData = dummyTxData.results[0]

export default {
  title: 'TxBlock',
  component: TxBlock
}

export const TxBlockSt = () => <TxBlock txData={dData} />

TxBlockSt.story = {
  name: 'TxBlock'
}
