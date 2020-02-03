import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const BlockStatCont = styled.div`
`

const fields = {
  merkelRoot: 'Merkle root',
  bits: 'Bits',
  version: 'Version',
  transactionCount: 'Number of Transactions',
  height: 'height',
  time: 'time',
  difficulty: 'difficulty',
  size: 'size',
  nonce: 'nonce',
  previousBlock: 'Previous Block'
}

const BlockStat = ({ listData }) => {
  return (
    listData
      ? <BlockStatCont>
      </BlockStatCont>
      : <div>loading</div>
  )
}

BlockStat.propTypes = {
  listData: PropTypes.array
}

BlockStat.defaultProps = {}

export default BlockStat
