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
  ListCont,
  Pkt
} from '../CommonComps/CommonComps'
import metrics from '../../theme/metrics'
// import RespHash from '../RespHash/RespHash'

const cells = {
  address: 'Address',
  balance: 'Balance'
}

const RichLink = styled(Link)`
  display: inline-block;
  word-break: break-all;
`

const ListLabelCont = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
`

export const RichListLabels = ({ cells }) => <ListLabelCont>{
  Object.values(cells).map((header) => <ListLabel key={header}>{header}</ListLabel>)
}</ListLabelCont>

const RichList = ({ listData }) => listData
  ? <ListCont rich>
    <RichListLabels cells={cells} />
    {/* Mapping over rich list addresses */}
    {listData.map((row) => <RichRow row={row} key={row.address}/>)}
  </ListCont>
  : <LoaderWrapper><Loader text='Rich list, loading'/></LoaderWrapper>

const RowCont = styled.div`
  display: flex;
  /* min-height: ${metrics.rowHeight}rem; */
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem ${metrics.padding}rem;
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
    <RichLink to={`/address/${row.address}`} title={row.address}>
      {row.address}
    </RichLink>
    <BalanceCont>
      <Pkt amt={row.balance}/>
    </BalanceCont>
  </RowCont>
}

RichList.propTypes = {
  listData: PropTypes.array
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
