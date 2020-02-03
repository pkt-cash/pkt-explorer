import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const BlockStatsCont = styled.div`
  display: flex;
  margin: ${metrics.margin}rem ${metrics.margin}rem ${metrics.margin}rem 0;
  flex-direction: row;
  
  @media (max-width: ${metrics.mq.small}px) {
    flex-direction: column;
  }
`

const BlockStatCell = styled.span`
  align-self: center; 
`

const DecoratedBlockStatCell = styled(BlockStatCell)`
  font-weight: ${metrics.fontWeight};
  margin-right: ${metrics.margin}rem;
`

const BlockStatsColumn = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: ${metrics.margin}rem;
`

const StatField = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.pktBlueDarker};
  display: flex;
  height: ${metrics.rowHeight}rem;
  flex-direction: row;
  justify-content: space-between;
`

export const FieldName = ({ name }) => <DecoratedBlockStatCell>{name}</DecoratedBlockStatCell>

export const FieldValue = ({ value }) => <BlockStatCell>{value}</BlockStatCell>

export const Hash = ({ hash }) => <BlockStatCell title={hash}>
  {`${hash.substr(0, 12)}…${hash.substr(-12, 12)}`}
</BlockStatCell>

export const DateTimeComp = ({ time }) => <BlockStatCell title={new Date(time).toString()}>
  {new Date(time).toDateString()}
</BlockStatCell>

export const BlockReward = ({ reward }) => <BlockStatCell>
  {reward} PKT
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
            <FieldName name="Block Reward" /><BlockReward reward={stats.blockReward} />
          </StatField>
          <StatField>
            <FieldName name="Timestamp" /><DateTimeComp time={stats.time} />
          </StatField>
        </BlockStatsColumn>
        <BlockStatsColumn key="second-column">
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
    bits: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    blockReward: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    nonce: PropTypes.number.isRequired,
    previousBlockHash: PropTypes.string.isRequired,
    nextBlockHash: PropTypes.string.isRequired,
    confirmations: PropTypes.number.isRequired
  })
}

DateTimeComp.propTypes = {
  time: PropTypes.string.isRequired
}

FieldName.propTypes = {
  name: PropTypes.string.isRequired
}

FieldValue.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

BlockReward.propTypes = {
  reward: PropTypes.number.isRequired
}

Hash.propTypes = {
  hash: PropTypes.string.isRequired
}

BlockStats.defaultProps = {}

export default BlockStats
