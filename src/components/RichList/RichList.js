import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Loader, { LoaderWrapper } from '../Loader/Loader'
import {
  // FirstListCell,
  // ListCell,
  // ListRow,
  ListLabel,
  ListLabelCont,
  ListCont
} from '../CommonComps/CommonComps'
import metrics from '../../theme/metrics'
import { displayPKT } from '../../utils'
// import RespHash from '../RespHash/RespHash'

const cells = {
  address: 'address',
  balance: 'balance'
}

const AddrLink = styled(Link)`
  color: ${({ theme }) => theme.colors.pktBlueLight};
  display: inline-block;
  word-break: break-all;
`

export const RichListLabels = ({ cells }) => <ListLabelCont>{
  Object.keys(cells).map((header) => <ListLabel key={header}>{header}</ListLabel>)
}</ListLabelCont>

const RichList = ({ listData, hashW }) => {
  return (
    listData
      ? <ListCont>
        <RichListLabels cells={cells} />
        {/* Mapping over rich list addresses */}
        {listData.map((row) => <RichRow row={row} key={row.address}/>)}
      </ListCont>
      : <LoaderWrapper><Loader text='Rich list, loading'/></LoaderWrapper>
  )
}

const RowCont = styled.div`
  display: flex;
  min-height: ${metrics.rowHeight}rem;
  justify-content: space-between;
  align-items: center;
  padding: ${metrics.padding}rem;
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
`
const BalanceCont = styled.div`
  white-space: nowrap;
  margin-left: 10px;
  span{
    font-weight: 700;
  }
`

const RichRow = ({ row }) => {
  return <RowCont>
    <AddrLink to={`/address/${row.address}`} title={row.address}>
      {row.address}
    </AddrLink>
    <BalanceCont>
      {parseFloat(displayPKT(row.balance)).toFixed(2)} <span>PKT</span>
    </BalanceCont>
  </RowCont>
}

RichList.propTypes = {
  listData: PropTypes.array,
  hashW: PropTypes.number
}

RichRow.propTypes = {
  row: PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }).isRequired
}

RichListLabels.propTypes = {
  cells: PropTypes.PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }).isRequired
}

RichList.defaultProps = {}

export default RichList
