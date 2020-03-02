import React from 'react'
import styled from 'styled-components'
import metrics, { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import { ListCont, ListLabelCont } from '../CommonComps/CommonComps'
import RespHash from '../RespHash/RespHash'
import Loader from '../Loader/Loader'

const BlockStatCell = styled.div`
  align-self: center; 
  text-align: right;
  flex: ${({ isHash }) => isHash ? 10 : 1};
`

const DecoratedBlockStatCell = styled(BlockStatCell)`
  font-weight: ${metrics.fontWeight};
  margin-right: ${metrics.margin}rem;
  text-align: left;
`

export const FieldName = ({ name }) => <DecoratedBlockStatCell>{name}</DecoratedBlockStatCell>

export const FieldValue = ({ value }) => <BlockStatCell>{value}</BlockStatCell>

export const Hash = ({ hash }) => <BlockStatCell title={hash} isHash>
  {/* {`${hash.substr(0, 12)}…${hash.substr(-12, 12)}`} */}
  <RespHash hash='0ae86e38250ca831b632ed998cc9384414561b6b4b3c9355388234fa95990a58' />
</BlockStatCell>

export const DateTimeComp = ({ time }) => <BlockStatCell title={new Date(time).toString()}>
  {new Date(time).toDateString()}
</BlockStatCell>

export const BlockReward = ({ reward }) => <BlockStatCell>
  {reward} PKT
</BlockStatCell>

export const Row = styled.div`
  /* margin: ${metrics.margin}rem ${metrics.margin}rem ${metrics.margin}rem 0; */
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Column = styled.div`
  min-width: 0;
  flex-basis: ${({ full }) => full ? '100%' : '50%'};
  
  @media ${mqs.small} {
    flex-basis: 100%;
    order: ${({ swap }) => swap ? 2 : 1}
  }
  p{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`
export const ItemCont = styled.div`
  padding: 0 0.5rem;
`
export const BrdCont = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.pktBlueDarker};
`
export const Label = styled.span`
  display: inline-block;
  white-space: nowrap;
  min-width : 100px;
  margin-right: 20px;
  font-weight: ${metrics.fontWeight};
`
export const Content = styled.span`
  display: inline-block;
  word-break: break-all;
`

const TableCont = styled.div`
  padding-top: 1rem;
`

const BlockStats = ({ stats }) => {
  return (stats
    ? <ListCont>
      <ListLabelCont>
        Last Block
      </ListLabelCont>
      <TableCont>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Merkle Root</Label> <Content title={stats.hash}>{stats.hash}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Difficulty</Label> <Content>{parseFloat(stats.difficulty).toFixed(2)}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Bits</Label> <Content>{stats.bits}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Size (Bytes)</Label> <Content>{stats.size}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Version</Label> <Content>{stats.version}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Nonce</Label> <Content>{stats.nonce}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Number of Transactions</Label> <Content>{stats.transactionCount}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Previous Block</Label> <Content title={stats.previousBlockHash}>{stats.previousBlockHash}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column swap>
            <ItemCont>
              <BrdCont>
                <p><Label>Height</Label> <Content>{stats.height}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          {stats.nextBlockHash && <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Next Block</Label> <Content title={stats.nextBlockHash}>{stats.nextBlockHash}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>}
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Timestamp</Label> <Content>{new Date(stats.time).toDateString()}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Confirmations</Label> <Content>{stats.confirmations}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
      </TableCont>
    </ListCont>
    : <Loader text='Loading block statistics' />)
}

BlockStats.propTypes = {
  stats: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    bits: PropTypes.number.isRequired,
    version: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    blockReward: PropTypes.number,
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
