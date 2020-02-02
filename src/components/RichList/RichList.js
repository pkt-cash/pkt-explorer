import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const RichListCell = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const RichListHeightCell = styled(RichListCell)`
  justify-content: flex-start;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.pktBlueLight} 
`

const RichListCont = styled.div`
  margin: ${metrics.margin}px;
`

const RichListLabel = styled.div`
  display: flex;
  font-weight: ${metrics.font};
  justify-content: flex-end;
  width: 100%;
  
  :first-child {
    justify-content: flex-start;    
  }
`

const RichListLabelsCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${metrics.margin}px;
  text-transform: capitalize;
  width: 100%;
`
const RichListRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight };
  }
`

const RichList = ({ listData }) => {
  const cells = {
    address: 'address',
    balance: 'balance'
  }

  const RichListLabels = <RichListLabelsCont>{
    Object.keys(cells).map((header) => <RichListLabel key={header}>{header}</RichListLabel>)
  }</RichListLabelsCont>

  return (
    listData
      ? <RichListCont>
        {RichListLabels}
        {listData.results.map((address) => <RichListRow key={address.address}>
          {Object.values(cells).map((cellName) => {
            if (cellName === 'address') {
              return <RichListHeightCell key={`${address.address}-${cellName}`}>
                {address[cellName]}
              </RichListHeightCell>
            }

            return <RichListCell key={`${address.address}-${cellName}`}>
              {address[cellName]}
            </RichListCell>
          })}
        </RichListRow>)}
      </RichListCont>
      : <div>loading</div>
  )
}

RichList.propTypes = {
  listData: PropTypes.array
}

RichList.defaultProps = {}

export default RichList
