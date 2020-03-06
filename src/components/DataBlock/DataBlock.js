import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Pkt } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
import Loader from '../Loader/Loader'

const TableCont = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
`

const ItemCont = styled.div`
  width: 50%;
  @media ${mqs.small} {
    width: 100%;
  }
`
const Item = styled.div`
  padding: 0 0.5rem;

`
const LabelCont = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.pktBlueDarker};
  padding: 1rem 0;
`

export const Label = styled.span`
  display: inline-block;
  white-space: nowrap;
  min-width : 100px;
  margin-right: 20px;
  font-weight: ${metrics.fontWeight};
`

const HashCont = styled.div`
display: inline-block;
word-break: break-all
`

const ValCont = ({ val, type }) => {
  switch (type) {
    case 'pkt':
      return <Pkt amt={val} />
    case 'hash':
      return <HashCont>{val}</HashCont>
    default:
      return <span>{val}</span>
  }
}

const DataBlock = ({ data }) =>
  <TableCont>
    {data
      ? data.map((d, i) => <ItemCont key={`dat-${i}`}>
        <Item>
          <LabelCont>
            <Label>
              {d.label}
            </Label>
            <div>
              <ValCont type={d.type} val={d.value} />

            </div>

          </LabelCont>
        </Item>
      </ItemCont>)
      : <Loader text={'Loading'} small />
    }
  </TableCont>

ValCont.propTypes = {
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  type: PropTypes.string
}

DataBlock.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.array.isRequired])
}

export default DataBlock
