import React from 'react'
import TimeAgo from 'javascript-time-ago'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'
import { 
  // FirstListCell,
  ListCell,
  // ListRow,
  ListLabel,
  ListLabelCont,
  ListCont
} from '../CommonComps/CommonComps'
import { Link } from 'react-router-dom'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
import Loader, { LoaderWrapper } from '../Loader/Loader'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

const BlockListTimeCell = styled(ListCell)`
  cursor: pointer;
  font-size: ${metrics.dateTimeFontSize}rem;
  /* justify-content: flex-start; */
`

const BlockListLabel = styled(ListLabel)`
  :nth-child(2) {
    /* justify-content: center; */
  }
`

export const AgeCell = ({ time }) => {
  const dt = (new Date(time)).getTime()
  const cDate = (new Date()).getTime()
  const diff = cDate - dt

  const humanInterval = timeAgo.format(cDate - diff)

  return (<span title={(new Date(time)).toString()}>
    {humanInterval.toString()}
  </span>)
}

// export const BlockRow = ({ blk }) => <ListRow>
//   <FirstListCell key={`${blk.hash}-height`}><Link to={`/block/${blk.hash}`}>{blk.height}</Link></FirstListCell>
//   <BlockListTimeCell>
//     <AgeCell time={blk.time} />
//   </BlockListTimeCell>
//   <ListCell>
//     {blk.transactionCount}
//   </ListCell>
//   <ListCell key={`${blk.hash}-size`}>
//     {blk.size}
//   </ListCell>
// </ListRow>

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
        {listData.map((blk) => <NewRow blk={blk} key={blk.hash}/>)}
        {/* {listData.map((blk) => <BlockRow blk={blk} key={blk.hash}/>)} */}
      </ListCont>
      : <LoaderWrapper><Loader /></LoaderWrapper>
  )
}

const RowCell = styled.div`

`



const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  /* align-content: space-between;  */
  justify-content: space-between;
  padding: 0.5rem 1rem ;
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }

`

const NewRow = ({ blk }) => <Row>
  <Link to={`/block/${blk.hash}`}>{blk.height}</Link>
  <AgeCell time={blk.time} />
  <RowCell>{blk.transactionCount}</RowCell>
  <RowCell>{blk.size}</RowCell>
</Row>

BlockList.propTypes = {
  listData: PropTypes.array
}

NewRow.propTypes = {
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
