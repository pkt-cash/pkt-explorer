import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const BlockListCell = styled.div`
  display: flex;
  font-size: ${metrics.cellFontSize}rem;
  justify-content: flex-end;
  width: 100%;
`

const BlockListHeightCell = styled(BlockListCell)`
  cursor: pointer;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.pktBlueLight};
  text-decoration: underline;
`
const BlockListTimeCell = styled(BlockListCell)`
  cursor: pointer;
  font-size: ${metrics.dateTimeFontSize}rem;
  justify-content: flex-start;
`

const BlockListCont = styled.div`
  border-top: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  border-right: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  box-shadow: -2px 2px 2px ${({ theme }) => theme.colors.pktGreyLight};
  margin: ${metrics.margin}rem;
`

const BlockListLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${metrics.headerFontSize}rem;
  font-weight: ${metrics.fontWeight};
  width: 100%;
  
  :first-child {
    justify-content: flex-start;    
  }
  
  :nth-child(2) {
    justify-content: center;    
  }
`

const BlockListLabelsCont = styled.div`
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  justify-content: space-between;
  padding: ${metrics.padding}rem;
  text-transform: capitalize;
  width: 100%;
`
const BlockListRow = styled.div`
  align-items: flex-end;
  align-items: center;
  display: flex;
  height: ${metrics.rowHeight}rem;
  justify-content: space-between;
  padding: 0 ${metrics.padding}rem;
  width: 100%;
  
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
`

const BlockRow = ({ blk }) => <BlockListRow key={blk.hash}>
  <BlockListHeightCell key={`${blk.hash}-height`}>{blk.height}</BlockListHeightCell>
  <BlockListTimeCell key={`${blk.hash}-time`}>
    {/* Shorten formatted age by removing its end part */}
    {new Date(blk.time).toString()
      .replace(/[A-Z]{3,3}.*$/, '')}
  </BlockListTimeCell>
  <BlockListCell key={`${blk.hash}-transactionCount`}>
    {blk.transactionCount}
  </BlockListCell>
  <BlockListCell key={`${blk.hash}-size`}>
    {blk.size}
  </BlockListCell>
</BlockListRow>

const cells = {
  height: 'height',
  age: 'time',
  transactions: 'transactionCount',
  size: 'size'
}

export const BlockListLabels = ({ cells }) => <BlockListLabelsCont>{
  Object.keys(cells).map((header) => <BlockListLabel key={header}>{header}</BlockListLabel>)
}</BlockListLabelsCont>

const BlockList = ({ listData }) => {
  console.log('diffTime', Math.round((new Date().getTime() - 1580395058553) / 1000))
  return (
    listData
      ? <BlockListCont>
        <BlockListLabels cells={cells} />
        {/* Mapping over blocks */}
        {listData.map((blk) => <BlockRow blk={blk} key={blk.hash}/>)}
      </BlockListCont>
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
