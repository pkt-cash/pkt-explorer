import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const BlockStatsCont = styled.div`
  margin: ${metrics.margin}rem
`

const BlockStatCell = styled.span`
  align-self: center; 
`

const BlockStatsColumn = styled.section`
  display: flex;
  flex-direction: column;
`

const StatField = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.pktBlueDarker};
  display: flex;
  height: ${metrics.rowHeight}rem;
  flex-direction: row;
  justify-content: space-between;
`

export const FieldName = ({ name }) => <BlockStatCell>{name}</BlockStatCell>

export const FieldValue = ({ value }) => <BlockStatCell>{value}</BlockStatCell>

export const Hash = ({ hash }) => <BlockStatCell title={hash}>
  {`${hash.substr(0, 12)}…${hash.substr(-12, 12)}`}
</BlockStatCell>

const BlockStats = ({ stats }) => {
  return (
    stats
      ? <BlockStatsCont>
        <BlockStatsColumn>
          <StatField>
            <FieldName name="Merkle Root" /><Hash hash={stats.hash} />
          </StatField>
          <StatField>
            <FieldName name="Bits" /><FieldValue value={stats.bits} />
          </StatField>
          <StatField>
            <FieldName name="Version" /><FieldValue value={stats.version} />
          </StatField>
          <StatField>
            <FieldName name="Number of Transactions" /><FieldValue value={stats.transactionCount} />
          </StatField>
          <StatField>
            <FieldName name="Height" /><FieldValue value={stats.height} />
          </StatField>
          <StatField>
            <FieldName name="Block Reward" /><FieldValue value={stats.blockReward + 'PKT'} />
          </StatField>
          <StatField>
            <FieldName name="Timestamp" /><FieldValue value={new Date(stats.time).toString()} />
          </StatField>
        </BlockStatsColumn>
        <BlockStatsColumn>
          <StatField>
            <FieldName name="Difficulty" /><FieldValue value={stats.difficulty} />
          </StatField>
          <StatField>
            <FieldName name="Size (Bytes)" /><FieldValue value={stats.size} />
          </StatField>
          <StatField>
            <FieldName name="Nonce" /><FieldValue value={stats.nonce} />
          </StatField>
          <StatField>
            <FieldName name="Previous Block" /><Hash hash={stats.previousBlockHash} />
          </StatField>
          <StatField>
            <FieldName name="Next Block" /><Hash hash={stats.nextBlockHash} />
          </StatField>
          <StatField>
            <FieldName name="Confirmations" /><FieldValue value={stats.confirmations} />
          </StatField>
        </BlockStatsColumn>
      </BlockStatsCont>
      : <div>loading</div>
  )
}

BlockStats.propTypes = {
  stats: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    bits: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    blockReward: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    nonce: PropTypes.number.isRequired,
    previousBlockHash: PropTypes.number.isRequired,
    nextBlockHash: PropTypes.number.isRequired,
    confirmations: PropTypes.number.isRequired
  }).isRequired
}

FieldName.propTypes = {
  name: PropTypes.string.isRequired
}

FieldValue.propTypes = {
  value: PropTypes.string.isRequired
}

Hash.propTypes = {
  hash: PropTypes.string.isRequired
}

BlockStats.defaultProps = {}

export default BlockStats
