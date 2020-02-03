import React from 'react'
import PropTypes from 'prop-types'
import { FirstListCell, ListCell, ListRow, ListLabel, ListLabelCont, ListCont } from '../CommonComps/CommonComps'

const cells = {
  address: 'address',
  balance: 'balance'
}

export const RichListLabels = ({ cells }) => <ListLabelCont>{
  Object.keys(cells).map((header) => <ListLabel key={header}>{header}</ListLabel>)
}</ListLabelCont>

export const RichListRowCont = ({ row }) => <ListRow key={row.address}>
  <FirstListCell key={`${row.address}-address`}>
    <span title={row.address}>
      {row.address.substr(0, 12)}
      …
      {row.address.substr(-12, 12)}
    </span>
  </FirstListCell>
  <ListCell key={`${row.address}-balance`}>
    {row.balance}
  </ListCell>
</ListRow>

const RichList = ({ listData }) => {
  return (
    listData
      ? <ListCont>
        <RichListLabels cells={cells} />
        {/* Mapping over rich list addresses */}
        {listData.map((row) => <RichListRowCont row={row} key={row.address} />)}
      </ListCont>
      : <div>loading</div>
  )
}

RichList.propTypes = {
  listData: PropTypes.array
}

RichListRowCont.propTypes = {
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
