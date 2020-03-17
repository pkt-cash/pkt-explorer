import React from 'react'
import styled from 'styled-components'
import metrics, { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import {
  ListCont,
  ListLabelCont,
  ListLabel,
  TitleHeader,
  LeftCont,
  RightCont,
  TitleCont,
  HashCont,
  Hash
} from '../CommonComps/CommonComps'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import Copy from '../Copy/Copy'

import { commafy, bpsStr, formatDate } from '../../utils'

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
  border-top: 1px solid ${({ theme }) => theme.colors.pktTableBorder};
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
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableCont = styled.div`
  /*padding-top: 1rem;*/
`

const BlockStats = ({ stats, blkPc, mainChain, nextBlk, topBlk }) => {
  if (!stats) {
    return (<Loader text='Loading block statistics' />)
  }
  let nextHash
  let isOrphan = false
  if (nextBlk && nextBlk.results && nextBlk.results.length) {
    const nb = nextBlk.results[0]
    if (nb.previousBlockHash !== stats.hash) {
      isOrphan = true
    } else {
      nextHash = nb.hash
    }
  }

  return (<>
    <TitleCont>
      <LeftCont>
        <TitleHeader>
          {(isOrphan)
            ? `Orphan block ${stats.hash} #${stats.height}`
            : `Block #${stats.height}`}
        </TitleHeader>
      </LeftCont>
      {!isOrphan &&
        <RightCont>
          <HashCont>
            <Hash>{stats.hash}</Hash>
            <Copy value={stats.hash}/>
          </HashCont>
        </RightCont>
      }
    </TitleCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>Summary</ListLabel>
      </ListLabelCont>
      <TableCont>
        <Row>
          <Column>
            <ItemCont>
              <p><Label>Size (bytes)</Label> <Content>{commafy(stats.size)}</Content></p>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <p><Label>Difficulty</Label> <Content>{commafy(parseFloat(stats.difficulty).toFixed())}</Content></p>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Transactions</Label> <Content>{stats.transactionCount}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>Next Block</Label>
                  {(() => {
                    if (isOrphan) {
                      return <Content>Not in main chain</Content>
                    } else if (nextHash) {
                      return <Content title={nextHash}>
                        <Link to={`/block/${nextHash}`}>{stats.height + 1}</Link>
                      </Content>
                    }
                  })()}
                </p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column swap>
            <ItemCont>
              <BrdCont>
                <p><Label>Hash</Label> <Content>{stats.hash}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>Previous Block</Label>
                  <Content title={stats.previousBlockHash}>
                    <Link to={`/block/${stats.previousBlockHash}`}>
                      {(() => {
                        if (isOrphan) {
                          return stats.previousBlockHash
                        }
                        // TODO(cjd): There is a possibility that we have an orphan which extends
                        // from another orphan, in that case we would be lying
                        return stats.height - 1
                      })()}
                    </Link>
                  </Content>
                </p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>Timestamp</Label>
                  {(() => {
                    const d = new Date(stats.time)
                    return <Content title={d.toUTCString()}>{formatDate(d)}</Content>
                  })()}
                </p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>Confirmations</Label>
                  <Content>
                    {(() => {
                      if (isOrphan) {
                        return 'Unconfirmed - Orphan Block'
                      } else if (topBlk) {
                        return topBlk.height - stats.height
                      }
                    })()}
                  </Content>
                </p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
      </TableCont>
    </ListCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>PacketCrypt</ListLabel>
      </ListLabelCont>
      <TableCont>
        <Row>
          <Column>
            <ItemCont>
              <p><Label>Announcements</Label> <Content>{commafy(stats.pcAnnCount)}</Content></p>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <p><Label>Announcement Difficulty</Label> <Content>{commafy(parseFloat(stats.pcAnnDifficulty).toFixed(2))}</Content></p>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Estimated Bandwidth</Label> <Content>{bpsStr(blkPc.blockBits)}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>Estimated Encryptions</Label> <Content>{commafy(parseFloat(blkPc.blockEncryptions).toFixed())}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
        </Row>
      </TableCont>
    </ListCont>
  </>)
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
    previousBlockHash: PropTypes.string.isRequired
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
