import React from 'react'
import TimeAgo from 'javascript-time-ago'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'
import { FirstListCell, ListCell, ListRow, ListLabel, ListLabelCont, ListCont } from '../CommonComps/CommonComps'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

const BlockListTimeCell = styled(ListCell)`
  cursor: pointer;
  font-size: ${metrics.dateTimeFontSize}rem;
  justify-content: flex-start;
`

const BlockListLabel = styled(ListLabel)`
  :nth-child(2) {
    justify-content: center;
  }
`

export const AgeCell = ({ time }) => {
  const dt = (new Date(time)).getTime()
  const cDate = (new Date()).getTime()
  const diff = cDate - dt

  const humanInterval = timeAgo.format(cDate - diff)

  return (<div>
    {humanInterval.toString()}
  </div>)
}

export const BlockRow = ({ blk }) => <ListRow key={blk.hash}>
  <FirstListCell key={`${blk.hash}-height`}>{blk.height}</FirstListCell>
  <BlockListTimeCell key={`${blk.hash}-time`}>
    <AgeCell time={blk.time} />
  </BlockListTimeCell>
  <ListCell key={`${blk.hash}-transactionCount`}>
    {blk.transactionCount}
  </ListCell>
  <ListCell key={`${blk.hash}-size`}>
    {blk.size}
  </ListCell>
</ListRow>

const cells = {
  height: 'height',
  age: 'time',
  transactions: 'transactionCount',
  size: 'size'
}

export const BlockListLabels = ({ cells }) => <ListLabelCont>{
  Object.keys(cells).map((header) => <BlockListLabel key={header}>{header}</BlockListLabel>)
}</ListLabelCont>

const BlockList = ({ listData }) => {
  return (
    listData
      ? <ListCont>
        <BlockListLabels cells={cells} />
        {/* Mapping over blocks */}
        {listData.map((blk) => <BlockRow blk={blk} key={blk.hash}/>)}
      </ListCont>
      : <div>loading</div>
  )
}

BlockList.propTypes = {
  listData: PropTypes.array
}

BlockRow.propTypes = {
  blk: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }).isRequired
}

AgeCell.propTypes = {
  time: PropTypes.string.isRequired
}

BlockListLabels.propTypes = {
  cells: PropTypes.PropTypes.shape({
    height: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    transactions: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }).isRequired
}

BlockList.defaultProps = {}

export default BlockList
