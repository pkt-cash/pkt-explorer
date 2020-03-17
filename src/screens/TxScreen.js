import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TxBlock from '../components/TxBlock/TxBlock'
import { Row, Column, ItemCont, Label, BrdCont, Content } from '../components/BlockStats/BlockStats'
import {
  ListLabelCont,
  ListCont,
  ListLabel,
  TitleCont,
  LeftCont,
  RightCont,
  TitleHeader,
  HashCont,
  Hash,
  Pkt
} from '../components/CommonComps/CommonComps'
import Copy from '../components/Copy/Copy'


import endpoints from '../utils/endpoints'
import Loader from '../components/Loader/Loader'
import { fetchJson, useInterval, commafy, formatDate } from '../utils'
const { blkUpApi, blkDownApi, txApi, statsCoinsApi } = endpoints

const TableCont = styled.div`
  /*padding-top: 1rem;*/
`

const renderCoinbase = (cb) => (
  cb.replace(/[a-f0-9]{2}/g, (x) => {
    const cc = Number('0x' + x);
    if (cc >= 32 && cc < 127) {
      return String.fromCharCode(cc);
    }
    return '\\x' + x;
  })
);

const row = (isFirst, left, right) => (
  <Row>
    <Column>
      <ItemCont>
        {!isFirst ? <BrdCont>{left}</BrdCont> : left}
      </ItemCont>
    </Column>
    <Column>
      <ItemCont>
        {!isFirst ? <BrdCont>{right}</BrdCont> : right}
      </ItemCont>
    </Column>
  </Row>
)

const inBlock = ({txData, isUnconfirmed}) => <p>
  <Label>In Block</Label>
  {txData.blockHash ?
    <Content title={txData.blockHash}>
      <Link to={`/block/${txData.blockHash}`}>
        {isUnconfirmed ?
          txData.blockHash :
          txData.blockHeight
        }
      </Link>
    </Content> :
    <Content>Unconfirmed</Content>
  }
</p>

const TxStats = ({ txData, nextBlk, topBlk, statsCoins }) => {
  let confirmations = 'Unconfirmed';
  let isUnconfirmed = false
  if (!txData.blockHash || !txData.blockHeight) {
    isUnconfirmed = true
  } else if (nextBlk && nextBlk.results && nextBlk.results.length) {
    const nb = nextBlk.results[0]
    if (nb.previousBlockHash !== txData.blockHash) {
      isUnconfirmed = true
    } else if (topBlk) {
      confirmations = topBlk.height - txData.blockHeight
    }
  }
  let fee = 0;
  if (txData) {
    for (const x of txData.input) { fee += Number(x.value); }
    for (const x of txData.output) { fee -= Number(x.value); }
  }
  let totalFees = 0;
  if (statsCoins) {
    // In a coinbase, the "fee" will end up negative because no inputs
    totalFees = -(Number(statsCoins.reward) + fee);
  }
  return (<>
    <TitleCont>
      <LeftCont>
        <TitleHeader>
          {txData.coinbase ?
            isUnconfirmed ?
              `Orphaned coinbase transaction` :
              `Coinbase transaction` :
            isUnconfirmed ?
              `Unconfirmed transaction` :
              `Transaction`
          }
        </TitleHeader>
      </LeftCont>
      <RightCont>
        <HashCont>
          <Hash>{txData.txid}</Hash>
          <Copy value={txData.txid}/>
        </HashCont>
      </RightCont>
    </TitleCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>Summary</ListLabel>
      </ListLabelCont>
      <TableCont>
        {row(true,
          <p>
            <Label>Size (Bytes)</Label>
            <Content>{commafy(txData.size)}</Content>
          </p>,
          (txData.coinbase ?
            <p>
              <Label>Coinbase</Label>
              <Content>{renderCoinbase(txData.coinbase)}</Content>
            </p> :
            <p>
              <Label>Fees Per Byte</Label>
              <Content>
                <Pkt amt={fee / txData.size}/>
              </Content>
            </p>
          )
        )}
        {txData.coinbase && row(false,
          <p>
            <Label>Fees Collected</Label>
            <Content>{statsCoins && <Pkt amt={totalFees}/>}</Content>
          </p>,
          <p>
            <Label>Block Reward</Label>
            <Content><Pkt amt={statsCoins.reward}/></Content>
          </p>
        )}
        {row(false,
          (!txData.coinbase ?
            <p>
              <Label>Inputs</Label>
              <Content>{commafy(txData.inputCount)}</Content>
            </p> :
            inBlock({txData, isUnconfirmed})
          ),
          <p>
            <Label>Outputs</Label>
            <Content>{commafy(txData.outputCount)}</Content>
          </p>
        )}
        {(!txData.coinbase && row(false,
          <p>
            <Label>Lock Time</Label>
            <Content>{txData.locktime}</Content>
          </p>,
          inBlock({txData, isUnconfirmed})
        ))}
        {row(false,
          <p>
            <Label>First Seen</Label>
            <Content>{formatDate(txData.firstSeen)}</Content>
          </p>,
          <p>
            <Label>Confirmations</Label>
            <Content>{confirmations}</Content>
          </p>
        )}
      </TableCont>
    </ListCont>
  </>)
};

const TxScreen = (props) => {
  const [txData, setTxData] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)

  // const [txDetail, setTxDetail] = useState(false)
  // const [detailLoad, setDetailLoad] = useState(true)

  const [txError, setTxError] = useState(false)

  const [nextBlk, setNextBlk] = useState(false)
  const [topBlk, setTopBlk] = useState(false)
  const [statsCoins, setStatsCoins] = useState(false)

  // const [txList, setTxList] = useState(false)
  const { id } = useParams()

  // Top of the chain
  const getTop = () => {
    fetchJson(`${blkDownApi}/1/1`)
      .then((json) => {
        if (json.error) {
          console.error(json.error)
        }
        setTopBlk(json.results[0])
      })
  }
  useInterval(getTop, 30000)

  useEffect(() => {
    // fetch block data
    fetchJson(`${txApi}/${id}`)
      .then((json) => {
        if (json.error) {
          return setTxError(true)
        }
        setTxData(json)
        setMetaLoad(false)

        if (json.coinbase) {
          // If it's a coinbase then calculate the total fees
          console.log(`${statsCoinsApi}/${json.blockHeight}`);
          fetchJson(`${statsCoinsApi}/${json.blockHeight}`)
            .then((json) => {
              if (json.error) {
                console.log(json.error)
              }
              console.log('setStatsCoins', json);
              setStatsCoins(json)
            })
        }

        // Next block data (to verify the block is in the main chain)
        setNextBlk(false)
        fetchJson(`${blkUpApi}/1/${json.blockHeight + 2}`)
          .then((json) => {
            if (json.error) {
              console.error(json.error)
            }

            setNextBlk(json)
          })
      })

    // fetch tx details -- these are not currently used
    // fetchJson(`${txApi}/${id}/detail`)
    //   .then((json) => {
    //     if (json.error) {
    //       return setTxError(true)
    //     }
    //     setTxDetail(json)
    //     setDetailLoad(false)
    //   })

    // Get the top for the number of confirmations
    getTop()
  }, [id])

  if (txError) return <div>Error fetching tx {id}</div>
  // console.log(blkData)
  return <>
    {metaLoad
      ? <Loader text='Loading Transaction' />
      : <>
        <TxStats txData={txData} nextBlk={nextBlk} topBlk={topBlk} statsCoins={statsCoins} />
        <ListCont>
          <ListLabelCont>
            <ListLabel>Details</ListLabel>
          </ListLabelCont>
          <TxBlock txData={txData} key={`coin-0`} view="tx"/>
        </ListCont>
      </>
    }
  </>
}

export default TxScreen
