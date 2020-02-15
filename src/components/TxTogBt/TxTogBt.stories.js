import React from 'react'
import TxTogBt from './TxTogBt'

export default {
  title: 'TxTogBt',
  component: TxTogBt
}

export const TxTogBtSt = () => <TxTogBt isOpen={true} />

TxTogBtSt.story = {
  name: 'TxTogBt'
}
