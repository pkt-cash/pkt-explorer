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
    background-color: ${({ theme }) => theme.colors.pktGreyLight };
  }
`

const BlockList = ({ listData }) => {
  const cells = {
    height: 'height',
    age: 'time',
    transactions: 'transactionCount',
    size: 'size'
  }

  const BlockListLabels = <BlockListLabelsCont>{
    Object.keys(cells).map((header) => <BlockListLabel key={header}>{header}</BlockListLabel>)
  }</BlockListLabelsCont>

  return (
    listData
      ? <BlockListCont>
        {BlockListLabels}
        {listData.results.map((blk) => <BlockListRow key={blk.hash}>

        {/* Mapping over blocks */}
        {listData.map((blk) => <BlockListRow key={blk.hash}>

          {/* Mapping over cells for each block */}
          {Object.values(cells).map((cellName) => {
            let cell = null
            switch (cellName) {
              case 'height':
                cell = <BlockListHeightCell key={`${blk.hash}-${cellName}`}>
                  {blk[cellName]}
                </BlockListHeightCell>
                break
              case 'time':
                cell = <BlockListTimeCell key={`${blk.hash}-${cellName}`}>
                  {/* Shorten formatted age by removing its end part */}
                  {new Date(blk[cellName]).toString()
                    .replace(/[A-Z]{3,3}.*$/, '')}
                </BlockListTimeCell>
                break
              default:
                cell = <BlockListCell key={`${blk.hash}-${cellName}`}>
                  {blk[cellName]}
                </BlockListCell>
            }

            return cell
          })}
        </BlockListRow>)}
      </BlockListCont>
      : <div>loading</div>
  )
}

BlockList.propTypes = {
  listData: PropTypes.array
}

BlockList.defaultProps = {}

export default BlockList
