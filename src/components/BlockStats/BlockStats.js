import React from 'react'
import styled from 'styled-components'
import metrics, { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import {
  ListCont,
  ListLabelCont,
  ListLabel,
  mkTitle,
  TitleHeader,
  HashCont,
  NoWrap
} from '../CommonComps/CommonComps'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
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

const FieldName = ({ name }) => <DecoratedBlockStatCell>{name}</DecoratedBlockStatCell>

const FieldValue = ({ value }) => <BlockStatCell>{value}</BlockStatCell>

const DateTimeComp = ({ time }) => <BlockStatCell title={new Date(time).toString()}>
  {new Date(time).toDateString()}
</BlockStatCell>

const BlockReward = ({ reward }) => <BlockStatCell>
  {reward} PKTC
</BlockStatCell>

// Only use this with mkTable, exporting it will just get someone burned
const TableCont = styled.div`
  /*padding-top: 1rem;*/
  @media (min-width: ${metrics.mq.small + 1}px) {
    &:last-child > *:last-child > div > div > div {
      border-bottom: 0;
    }
  }
  &:last-child > *:last-child > div:last-child > div > div {
    border-bottom: 0;
  }
  & > div > div > div > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.pktTableBorder};
  }
`

export const Row = styled.div`
  /* margin: ${metrics.margin}rem ${metrics.margin}rem ${metrics.margin}rem 0; */
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Column = styled.div`
  min-width: 0;
  flex-basis: ${({ full }) => full ? '100%' : '50%'};
  
  @media ${mqs.small} {
    flex-basis: 100%;
    order: ${({ swap }) => swap ? 2 : 1}
  }
  p {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    @media ${mqs.small} {
      flex-flow: column wrap;
    }
  }
`
const ItemCont = styled.div`
  padding: 0 0.5rem;
`

const Label = styled.span`
  display: inline-block;
  white-space: nowrap;
  /*min-width : 100px;  not needed because we have max-width on the content*/
  margin-right: 20px;
  font-weight: ${metrics.fontWeight};
`
const Content = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: ${metrics.mq.small + 1}px) {
    max-width: 70%; /* This is to prevent hash from always falling to the next line. */
  }
`

export const zipRows = (left, right) => {
  if (!right) { return left.map(x => <Row>{x}</Row>) }
  left = left.filter(x=>x)
  right = right.filter(x=>x)
  const out = [];
  for (let i = 0; ; i++) {
    if (i >= left.length && i >= right.length) { break; }
    out.push(
      <Row>
        {i < left.length && left[i]}
        {i < right.length && right[i]}
      </Row>
    )
  }
  return out
};

export const mkTable = (heading, left, right) =>
  <ListCont>
    {heading &&
      <ListLabelCont>
        <ListLabel>{heading}</ListLabel>
      </ListLabelCont>
    }
    <TableCont>{zipRows(left, right)}</TableCont>
  </ListCont>

export const mkRow = (key, val, titleOpt) =>
  <Column>
    <ItemCont>
      <div>
        <p>
          <Label>{key}</Label>
          <Content title={titleOpt}>{val}</Content>
        </p>
      </div>
    </ItemCont>
  </Column>

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

  return [
    mkTitle({
      title: (
        <TitleHeader>
          {(isOrphan)
            ? <NoWrap><Tooltip type="caution">
                When two miners find a block at the same time, only one of them can be valid.
                The miners decide which one they will continue building on top of and the one
                which is ignored is called an <Help.Orphan>orphan block</Help.Orphan>.
            </Tooltip><OrphanTTL>Orphan block #{stats.height}</OrphanTTL></NoWrap>
            : `Block #${stats.height}`}
        </TitleHeader>
      ),
      handle: <HashCont>{stats.hash}</HashCont>,
      copy: stats.hash
    }),
  
    mkTable('Summary',
    [
      mkRow(
        <>
          Size (bytes)
          <Tooltip>
            The total number of bytes of transactions in the block.
          </Tooltip>
        </>,
        commafy(stats.size)
      ),

      mkRow(
        <>
          Transactions
          <Tooltip>
            The number of transactions which are included in this block.
          </Tooltip>
        </>,
        stats.transactionCount
      ),

      mkRow(
        <>
          Hash
          <Tooltip>
            The SHA-256 hash of the block header, this serves as the block&apos;s
            universally unique identifier.
          </Tooltip>
        </>,
        stats.hash
      ),

      mkRow(
        <>
          Timestamp
          <Tooltip>
            The time, as it was declared by the miner who mined this block.
          </Tooltip>
        </>,
        formatDate(new Date(stats.time)),
        new Date(stats.time).toUTCString()
      ),
    ], [
      mkRow(
        <>
          Difficulty
          <Tooltip>
            How hard it was for the miners to mine this block.
          </Tooltip>
        </>,
        commafy(parseFloat(stats.difficulty).toFixed())
      ),

      mkRow(
        <>
          Next Block
          <Tooltip>
            {isOrphan
              ? <>This block is an <Help.Orphan>orphan</Help.Orphan> which
              means there are no blocks which build on top of it.
              </>
              : <>The next block which builds on top of this block in the chain.</>
            }
          </Tooltip>
        </>,
        (() => {
          if (isOrphan) {
            return 'Not in main chain'
          } else if (nextHash) {
            return <Link to={`/block/${nextHash}`}>{stats.height + 1}</Link>
          }
        })(),
        !isOrphan && nextHash
      ),

      mkRow(
        <>
          Previous Block
          <Tooltip>
            The block which this block builds on top of.
          </Tooltip>
        </>,
        <Link to={`/block/${stats.previousBlockHash}`}>{stats.height - 1}</Link>,
        stats.previousBlockHash
      ),

      mkRow(
        <>
          Confirmations
          <Tooltip>
            {isOrphan
              ? <>This block is an <Help.Orphan>orphan</Help.Orphan> so it is not
              part of the official chain. This block&apos;s sibling has {topBlk
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
        </>,
        (() => {
          if (topBlk && isOrphan) {
            return stats.height - topBlk.height
          } else if (topBlk) {
            return topBlk.height - stats.height
          }
        })()
      ),
    ]
    ),

    mkTable('PacketCrypt',
    [
      mkRow(
        <>
          Announcements
          <Tooltip>
            The number of 1KB messages which were sent from announcement miners
            and block miners and then eventually used to mine this block.
          </Tooltip>
        </>,
        commafy(stats.pcAnnCount)
      ),

      mkRow(
        <>
          Estimated Bandwidth
          <Tooltip>
            This is an estimate of how much bandwidth the whole network was using at
            the time when this block was found. Because announcements can be re-used
            with lower value, this estimate is not exact.
          </Tooltip>
        </>,
        bpsStr(blkPc.blockBits)
      ),
    ], [
      mkRow(
        <>
          Announcement Difficulty
          <Tooltip>
            The &quot;quality&quot; of the announcements which were used to mine this block.
            Announcement difficulty is made up of both the amount of work done on the
            announcements and the age of the announcements. Block miners are allowed
            to re-use announcements but each block their effective difficulty is cut
            in half.
            This number will tend to oscaillate from one block to the next as block
            miners must choose between throwing away &quot;low quality&quot; announcements or
            keeping them to bulk up on quantity.
          </Tooltip>
        </>,
        commafy(parseFloat(stats.pcAnnDifficulty).toFixed(2))
      ),

      mkRow(
        <>
          Estimated Encryptions Per Second
          <Tooltip>
            This estimate is based on the amount of hash-power needed to mine all of
            the announcements which were included in this block as well as the hash
            power which was used by the block miner to mine the block. Because hashing
            is based on a packet encryption algorithm, this is roughly equal to
            encryption of this number of packets per second of VPN network traffic.
          </Tooltip>
        </>,
        commafy(parseFloat(blkPc.blockEncryptions).toFixed())
      ),
    ])
  ]
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

BlockStats.defaultProps = {}

export default BlockStats
