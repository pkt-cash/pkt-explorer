import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaClock, FaCheckCircle } from 'react-icons/fa'
import metrics, { mqs } from '../../theme/metrics'
import { TxItem } from '../TxItem/Txitem'
import { ListLabelCont, ListCont } from '../CommonComps/CommonComps'
import { IoMdArrowForward } from 'react-icons/io'
import RespHash from '../RespHash/RespHash'
import { DateTime } from 'luxon'

const TxBlockCont = styled.div`
  border-bottom: solid 2px ${({ theme }) => theme.colors.pktGrey};
`

const TxLabel = styled.div`
  justify-content: items;
`

const TxlistCont = styled.div`
  overflow: hidden;
  padding: 0  0.5rem;
`

const TxCol = styled.div`
  width:47%;
  @media ${mqs.small} {
    width:100%;
  }
`

const TxColsCont = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

const InfoCont = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  background-color: #f8f8f8;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

const TxColSep = styled.div`
  width: 20px;
  height: ${({ small }) => small ? 'auto' : '45px'};
  display: flex;
  margin: 10px 0;
  align-items: center;
  text-align: center;
  @media ${mqs.small} {
    display: none;
  }
`

const LeftLabel = styled.span`
  display: flex;
  width: calc(100% - 30px);
  font-weight: ${metrics.fontWeight};
`

const TxInteractive = styled.span`
  display: block;
  margin-bottom: ${metrics.sep}rem;
`

const TxLastCont = styled.div`
  margin-right: 10px
`

const MinedAtLabel = styled(TxLabel)`
  margin-left: ${metrics.sep}rem;
  display: flex;
  align-items: flex-start;
  @media ${mqs.small} {
    margin: 1rem 0 0 0;
    justify-content: end;
  }
`

const RightLabel = styled.span`
  font-weight: ${metrics.fontWeight};
`

const TotalLabel = styled.span`
  font-weight: ${metrics.fontWeight};
  display: flex;
  flex-flow: row nowrap;
  align-items: center
`

const TxSmallLabel = styled.div`
  display: none;
  @media ${mqs.small} {
    display: block;
  }
`

const IcnCont = styled.span`
  margin-left: 5px;
  padding-top:2px;
`

const ConfIcn = ({ isConf }) => {
  return <IcnCont>{isConf
    ? <FaCheckCircle style={{ color: 'green' }} />
    : <FaClock style={{ color: '#dd8335' }} />}
  </IcnCont>
}

// import styled from 'styled-components'
const TxBlock = ({ txData }) => {
  const { txid, input, output, blockTime } = txData
  const dt = DateTime.fromISO(blockTime)
  console.log(txData)
  return (
    <TxBlockCont>
      <ListCont>
        <ListLabelCont>
          <TxLabel>
            <TxInteractive>
              <LeftLabel>Transaction:</LeftLabel>
            </TxInteractive>
            <RespHash hash={txid} />
          </TxLabel>
          <MinedAtLabel>
            {blockTime
              ? <><RightLabel>Mined: {dt.toLocaleString(DateTime.DATETIME_MED)}</RightLabel><ConfIcn isConf /></>
              : <><RightLabel>Unconfirmed transaction </RightLabel><ConfIcn /></>
            }
          </MinedAtLabel>
        </ListLabelCont>
        <TxlistCont>
          <TxColsCont>
            <TxSmallLabel>input</TxSmallLabel>
            <TxCol>
              {input && input.length
                ? input.map((data, i) => <TxItem key={`inputItem-${i}}`} address={data.address} value={data.value} size={120} />)
                : <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            </TxCol>
            <TxColSep><IoMdArrowForward size={30} /></TxColSep>
            <TxSmallLabel>output</TxSmallLabel>
            <TxCol>
              {output && output.map((data, i) => <TxItem unconfirmed={blockTime === undefined} key={`outputItem-${i}}`} address={data.address} value={data.value} size={120} />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
        {(input.length > 2 || output.length > 2) && <InfoCont>
          <TxLastCont>
            <TotalLabel>Total Inputs: {input.length}</TotalLabel>
          </TxLastCont>
          <TxLastCont>
            <TotalLabel>Total Outputs: {output.length}</TotalLabel>
          </TxLastCont>
        </InfoCont>}
      </ListCont>
    </TxBlockCont>
  )
}

TxBlock.propTypes = {
  txData: PropTypes.shape({
    txid: PropTypes.string.isRequired,
    blockTime: PropTypes.string.isRequired,
    input: PropTypes.array.isRequired,
    output: PropTypes.array.isRequired
  }).isRequired
}

export default TxBlock
