import React from 'react'
import TimeAgo from 'javascript-time-ago'
import {
  canonical
} from 'javascript-time-ago/gradation'
import styled from 'styled-components'
import { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import {
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

const agoOpts = { gradation: canonical }

const BlockListLabel = styled(ListLabel)`
  :nth-child(2) {
    /* justify-content: center; */
  }
`

export const AgeCell = ({ time }) => {
  const dt = (new Date(time)).getTime()
  const cDate = (new Date()).getTime()
  const diff = cDate - dt

  const humanInterval = timeAgo.format(cDate - diff, agoOpts)

  return (<span title={(new Date(time)).toString()}>
    {humanInterval.toString()}
  </span>)
}

export const BlockListLabels = ({ cells }) => <ListLabelCont>{
  Object.keys(cells).map((header) => <BlockListLabel key={header}>{header}</BlockListLabel>)
}</ListLabelCont>

const BlockTable = styled.table`
  width: 100%;
  padding:0;
  margin:0;
  tr {
    padding: 0 1rem;
  }
  tr:nth-child(2n) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
  th {
    text-transform: capitalize;
    padding: 1rem;
  }
  td {
    padding: .5rem 1rem;
  }

  border: none;
  border-collapse: inherit;
  border-spacing: 0;
  border-color: inherit;
  vertical-align: inherit;
  font-weight: inherit;
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;

  td:last-child,
  th:last-child{
    text-align: right
  }

`

const TrTh = styled.th`
  &:after {
    content: "Transactions";
    @media ${mqs.small} {
      content: "Tx";
    }
  }
`

const HideMobileTh = styled.th`
  @media ${mqs.small} {
    display: none;
  }
`

const HideMobileTd = styled.td`
  @media ${mqs.small} {
    display: none;
  }
`

const MS_MINUTE = 60 * 1000
// TODO: ask Caleb is this is usefull
// const GRADULATION_NODAY = [
//   {
//     unit: 'second'
//   },
//   {
//     unit: 'minute',
//     factor: 60,
//     threshold: 59.5
//   },
//   {
//     unit: 'hour',
//     factor: 60 * 60,
//     threshold: 59.5 * 60
//   }
// ]

const BlockList = ({ listData, home }) => {
  return (
    listData
      ? <ListCont>
        {home &&
          <ListLabelCont>
            <ListLabel>Most Recent Blocks</ListLabel>
          </ListLabelCont>
        }
        <BlockTable>
          <thead>
            <tr>
              <th scope="col">height</th>
              <th scope="col">age</th>
              <TrTh scope="col"/>
              <HideMobileTh scope="col">difficulty</HideMobileTh>
              <HideMobileTh scope="col">next diff (est.)</HideMobileTh>
              <HideMobileTh scope="col">next diff change</HideMobileTh>
              <th scope="col">size</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((blk) => <tr
              style={{ background: blk.blocksUntilRetarget === 0 ? '#ffb0b0' : '' }}
              key={`tr-${blk.height}`}>
              <td><Link to={`/block/${blk.hash}`}>{blk.height}</Link></td>
              <td><AgeCell time={blk.time} /></td>
              <td>{blk.transactionCount}</td>
              <HideMobileTd>{Math.floor(blk.difficulty)}</HideMobileTd>
              <HideMobileTd>{Math.floor(blk.retargetEstimate * blk.difficulty)}</HideMobileTd>
              <HideMobileTd>{timeAgo.format(+new Date() + (blk.blocksUntilRetarget * MS_MINUTE), {
                units: ['second', 'minute', 'hour']
              })}</HideMobileTd>
              <td>{blk.size}</td>
            </tr>)}
          </tbody>
        </BlockTable>
      </ListCont>
      : <LoaderWrapper><Loader /></LoaderWrapper>
  )
}

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
  <div>{blk.transactionCount}</div>
  <div>{blk.size}</div>
</Row>

BlockList.propTypes = {
  listData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  home: PropTypes.bool
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
