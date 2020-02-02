import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const BlockListCell = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const BlockListHeightCell = styled(BlockListCell)`
  justify-content: flex-start;    
  color: ${({ theme }) => theme.colors.pktBlueLight} 
`

const BlockListCont = styled.div`
  margin: ${metrics.margin}px;
`

const BlockListLabel = styled.div`
  display: flex;
  font-weight: ${metrics.fontWeight};
  justify-content: flex-end;
  width: 100%;
  
  :first-child {
    justify-content: flex-start;    
  }
`

const BlockListLabelsCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${metrics.margin}px;
  text-transform: capitalize;
  width: 100%;
`
const BlockListRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
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
          {Object.values(cells).map((cellName) => {
            let cell = null
            switch (true) {
              case cellName === 'height':
                cell = <BlockListHeightCell key={`${blk.hash}-${cellName}`}>
                  {blk[cellName]}
                </BlockListHeightCell>
                break
              case cellName === 'time':
                cell = <BlockListCell key={`${blk.hash}-${cellName}`}>
                  {/* Shorten formatted age by removing its end part */}
                  {new Date(blk[cellName]).toString()
                    .replace(/[A-Z]{3,3}.*$/, '')}
                </BlockListCell>
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
