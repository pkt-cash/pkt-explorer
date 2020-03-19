import React from 'react'
import styled from 'styled-components'
import metrics, { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import {
  ListCont,
  ListLabelCont,
  ListLabel,
  TitleHeader,
  AddrCont,
  TitleCont,
  HashCont,
  Hash,
  NoWrap
} from '../CommonComps/CommonComps'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import Copy from '../Copy/Copy'
import Tooltip from '../Tooltip/Tooltip'
import Help from '../Help/Help'

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

const OrphanTTL = styled.span`
  display: inline-block;
  margin-left: 5px;
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
      <div>
        <TitleHeader>
          {(isOrphan)
            ? <NoWrap><Tooltip type="caution">
                When two miners find a block at the same time, only one of them can be valid.
                The miners decide which one they will continue building on top of and the one
                which is ignored is called an <Help.Orphan>orphan block</Help.Orphan>.
            </Tooltip><OrphanTTL>Orphan block #{stats.height}</OrphanTTL></NoWrap>
            : `Block #${stats.height}`}
        </TitleHeader>
      </div>
      <AddrCont>
        <HashCont>
          <Hash>{stats.hash}</Hash>
        </HashCont>
        <Copy value={stats.hash}/>
      </AddrCont>
    </TitleCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>Summary</ListLabel>
      </ListLabelCont>
      <TableCont>
        <Row>
          <Column>
            <ItemCont>
              <p><Label>
                Size (bytes)
                <Tooltip>
                  The total number of bytes of transactions in the block.
                </Tooltip>
              </Label> <Content>{commafy(stats.size)}</Content></p>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <p><Label>
                Difficulty
                <Tooltip>
                  How hard it was for the miners to mine this block.
                </Tooltip>
              </Label> <Content>{commafy(parseFloat(stats.difficulty).toFixed())}</Content></p>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>
                  Transactions
                  <Tooltip>
                    The number of transactions which are included in this block.
                  </Tooltip>
                </Label> <Content>{stats.transactionCount}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>
                    Next Block
                    <Tooltip>
                      {isOrphan
                        ? <>This block is an <Help.Orphan>orphan</Help.Orphan> which
                        means there are no blocks which build on top of it.
                        </>
                        : <>The next block which builds on top of this block in the chain.</>
                      }
                    </Tooltip>
                  </Label>
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
                <p><Label>
                  Hash
                  <Tooltip>
                    The SHA-256 hash of the block header, this serves as the block's
                    universally unique identifier.
                  </Tooltip>
                </Label> <Content>{stats.hash}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p>
                  <Label>
                    Previous Block
                    <Tooltip>
                      The block which this block builds on top of.
                    </Tooltip>
                  </Label>
                  <Content title={stats.previousBlockHash}>
                    <Link to={`/block/${stats.previousBlockHash}`}>
                      {stats.height - 1}
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
                  <Label>
                    Timestamp
                    <Tooltip>
                      The time, as it was declared by the miner who mined this block.
                    </Tooltip>
                  </Label>
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
                  <Label>
                    Confirmations
                    <Tooltip>
                      {isOrphan
                        ? <>This block is an <Help.Orphan>orphan</Help.Orphan> so it is not
                        part of the official chain. This block's sibling has {topBlk
                          ? topBlk.height - stats.height
                          : <>(loading...)</>} confirmations, meaning the chain which does
                          not build on this block is that many blocks longer.
                        </>
                        : <>There are {topBlk
                          ? topBlk.height - stats.height
                          : <>(loading...)</>
                        } blocks which build on top
                        of this block</>
                      }
                    </Tooltip>
                  </Label>
                  <Content>
                    {(() => {
                      if (topBlk && isOrphan) {
                        return stats.height - topBlk.height
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
              <p><Label>
                Announcements
                <Tooltip>
                  The number of 1KB messages which were sent from announcement miners
                  and block miners and then eventually used to mine this block.
                </Tooltip>
              </Label> <Content>{commafy(stats.pcAnnCount)}</Content></p>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <p>
                <Label>
                  Announcement Difficulty
                  <Tooltip>
                    The "quality" of the announcements which were used to mine this block.
                    Announcement difficulty is made up of both the amount of work done on the
                    announcements and the age of the announcements. Block miners are allowed
                    to re-use announcements but each block their effective difficulty is cut
                    in half.
                    This number will tend to oscaillate from one block to the next as block
                    miners must choose between throwing away "low quality" announcements or
                    keeping them to bulk up on quantity.
                  </Tooltip>
                </Label> <Content>{commafy(parseFloat(stats.pcAnnDifficulty).toFixed(2))}</Content></p>
            </ItemCont>
          </Column>
        </Row>
        <Row>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>
                  Estimated Bandwidth
                  <Tooltip>
                    This is an estimate of how much bandwidth the whole network was using at
                    the time when this block was found. Because announcements can be re-used
                    with lower value, this estimate is not exact.
                  </Tooltip>
                </Label> <Content>{bpsStr(blkPc.blockBits)}</Content></p>
              </BrdCont>
            </ItemCont>
          </Column>
          <Column>
            <ItemCont>
              <BrdCont>
                <p><Label>
                  Estimated Encryptions Per Second
                  <Tooltip>
                    This estimate is based on the amount of hash-power needed to mine all of
                    the announcements which were included in this block as well as the hash
                    power which was used by the block miner to mine the block. Because hashing
                    is based on a packet encryption algorithm, this is roughly equal to
                    encryption of this number of packets per second of VPN network traffic.
                  </Tooltip>
                </Label> <Content>{commafy(parseFloat(blkPc.blockEncryptions).toFixed())}</Content></p>
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
