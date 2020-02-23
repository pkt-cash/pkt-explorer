import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import metrics, { mqs } from '../../theme/metrics'
// import TxChart from '../TxChart/TxChart'
import RespHash from '../RespHash/RespHash'
import EaringChart from '../EarningChart/EarningChart'
import { displayPKT } from '../../utils'

const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  }
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`
const MetaCont = styled.div`
  flex:1;
  border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight};
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  @media ${mqs.small} {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0;
  }

`
const MetaLine = styled.div`
  span {
    min-width: 50%;
    display:inline-block;
  }
`

const ChartCont = styled.div`
  flex: 1;
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

// const StatRow = styled.div`
//   display: flex;
//   flex:1;
//   align-items: center;
// `
// const StatCell = styled.div`
//   display: flex;
//   padding: 1rem;
//   flex:1;
// `

// const StatCellLabel = styled.div`
//   font-weight: 700;
//   padding-right: 1rem;
// `
// const StatCellValue = styled.div`
//   font-style: italic;
// `

const Sep = styled.hr`
  width: 100%;
  color: ${({ theme }) => theme.colors.pktGreyLight};
`

const AddrStats = ({ meta, addr, dailyTr }) => {
  return (
    <ListCont>
      <ListLabelCont>
        Address: <RespHash hash={addr} />
      </ListLabelCont>
      <ListDataCont>
        <MetaCont>
          <MetaLine>
            <span>Balance:</span>{parseFloat(displayPKT(meta.balance)).toFixed(2)} PKT
          </MetaLine>
          <Sep />
          <MetaLine>
            <span>Confirmed:</span>{parseFloat(displayPKT(meta.confirmedReceived)).toFixed(2)} PKT
          </MetaLine>
          <MetaLine>
            <span>spent:</span>{parseFloat(displayPKT(meta.spent)).toFixed(2)} PKT
          </MetaLine>
          {meta.burned && parseFloat(meta.burned) > 0 && <MetaLine>
            <span>burned:</span>{parseFloat(displayPKT(meta.burned)).toFixed(2)} PKT
          </MetaLine>}
          <Sep />
          <MetaLine>
            <span>transaction recived / spent:</span>{meta.recvCount} / {meta.spentCount}
          </MetaLine>
          <Sep />
          <MetaLine>
            <span>mined in the last 24h:</span>{meta.mined24}
          </MetaLine>
        </MetaCont>
        <ChartCont>
          {dailyTr ? <EaringChart txData={dailyTr} /> : 'Loading'}
        </ChartCont>
      </ListDataCont>
    </ListCont>
  )
}

AddrStats.propTypes = {
  meta: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
  dailyTr: PropTypes.array.isRequired
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default AddrStats
