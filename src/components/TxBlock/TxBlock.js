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
import { Link } from 'react-router-dom'

const TxBlockCont = styled.div`
  /*border-bottom: solid 2px ${({ theme }) => theme.colors.pktGrey};*/
  background: ${({ theme }) => theme.colors.pktTxBackground};
`

const TxLabel = styled.div`
  justify-content: items;
  margin: 1rem;
`

const TxlistCont = styled.div`
  overflow: hidden;
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
const TxBlock = ({ txData, view }) => {
  const { txid, input, output, blockTime } = txData
  const dt = DateTime.fromISO(blockTime)

  return (
    <TxBlockCont>
      <ListCont>
        <ListLabelCont>
          {view !== 'tx' &&
            <TxLabel>
              <Link to={`/tx/${txid}`}>
                <RespHash hash={txid} />
              </Link>
            </TxLabel>
          }
          {view !== 'block' && view !== 'tx' &&
            <MinedAtLabel>
              {blockTime
                ? <><RightLabel>Mined: {dt.toLocaleString(DateTime.DATETIME_MED)}</RightLabel><ConfIcn isConf /></>
                : <><RightLabel>Unconfirmed transaction </RightLabel><ConfIcn /></>
              }
            </MinedAtLabel>
          }
        </ListLabelCont>
        <TxlistCont>
          <TxColsCont>
            <TxSmallLabel>input</TxSmallLabel>
            <TxCol>
              {input && input.length
                ? input.map((data, i) => <TxItem
                    key={`inputItem-${i}}`}
                    address={data.address}
                    value={data.value}
                    size={120}
                    inputs={data.spentcount}
                  />)
                : <TxItem txt='No Inputs (Newly Generated Coins) ' />
              }
            </TxCol>
            <TxColSep><IoMdArrowForward size={30} /></TxColSep>
            <TxSmallLabel>output</TxSmallLabel>
            <TxCol>
              {output && output.map((data, i) => <TxItem
                spent={data.spentcount > 0}
                key={`outputItem-${i}}`}
                address={data.address}
                value={data.value}
                size={120}
              />)}
            </TxCol>
          </TxColsCont>
        </TxlistCont>
        {view !== 'tx' && (input.length > 2 || output.length > 2) && <InfoCont>
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
