import React from 'react'
import TxBlock from './TxBlock'
import dummyTxData from '../../fixtures/blockCoins.json'
import dummyTxDataSmall from '../../fixtures/blockCoinsSmall.json'

export default {
  title: 'TxBlock',
  component: TxBlock
}

export const TxBlockSt = () => <TxBlock txData={dummyTxData.results[0]} />
export const TxBlockStSmall = () => <TxBlock txData={dummyTxDataSmall.results[0]} />

TxBlockSt.story = {
  name: 'TxBlock'
}
TxBlockStSmall.story = {
  name: 'TxBlock small out'
}
