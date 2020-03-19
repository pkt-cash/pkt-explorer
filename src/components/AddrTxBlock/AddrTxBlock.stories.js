import React from 'react'
import AddrTxBlock from './AddrTxBlock'
import dummyTxData from '../../fixtures/blockCoins.json'
import dummyTxDataSmall from '../../fixtures/blockCoinsSmall.json'
import dummyTxDataSmallUnc from '../../fixtures/blockCoinsSmallUnc.json'

export default {
  title: 'AddrTxBlock',
  component: AddrTxBlock
}

export const AddrTxBlockSt = () => <AddrTxBlock txData={dummyTxData.results[0]} myAddr={'rrrrrrrrrrrrrrrr'} />
export const AddrTxBlockStSmall = () => <AddrTxBlock txData={dummyTxDataSmall.results[0]} myAddr={'rrrrrrrrrrrrrrrr'} />
export const AddrTxBlockStSmallUnc = () => <AddrTxBlock txData={dummyTxDataSmallUnc.results[0]} myAddr={'rrrrrrrrrrrrrrrr'} />

AddrTxBlockSt.story = {
  name: 'AddrTxBlock'
}
AddrTxBlockStSmall.story = {
  name: 'AddrTxBlock small out'
}
AddrTxBlockStSmallUnc.story = {
  name: 'AddrTxBlock small unconfirmed'
}
