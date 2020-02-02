import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'
import PropTypes from 'prop-types'

const RichListCell = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const RichListAddressCell = styled(RichListCell)`
  cursor: pointer;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.pktBlueLight};
  text-decoration: underline;
`

const RichListCont = styled.div`
  border-top: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  border-right: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  box-shadow: -2px 2px 2px ${({ theme }) => theme.colors.pktGreyLight};
  margin: ${metrics.margin}rem;
`

const RichListLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${metrics.headerFontSize}rem;
  font-weight: ${metrics.fontWeight};
  width: 100%;
  
  :first-child {
    justify-content: flex-start;    
  }
`

const RichListLabelsCont = styled.div`
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  justify-content: space-between;
  padding: ${metrics.padding}rem;
  text-transform: capitalize;
  width: 100%;
`
const RichListRow = styled.div`
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

        {/* Mapping over addresses */}
        {listData.results.map((address) => <RichListRow key={address.address}>

          {/* Mapping over cells for each address  */}
          {Object.values(cells).map((cellName) => {
            if (cellName === 'address') {
              return <RichListAddressCell key={`${address.address}-${cellName}`}>
                {address[cellName]}
              </RichListAddressCell>
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
