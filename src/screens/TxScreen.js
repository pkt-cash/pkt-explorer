import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Tooltip from '../components/Tooltip/Tooltip'
import Help from '../components/Help/Help'

import TxBlock from '../components/TxBlock/TxBlock'
import { mkTable, mkRow } from '../components/BlockStats/BlockStats'
import {
  ListLabelCont,
  ListCont,
  ListLabel,
  HashCont,
  mkTitle,
  TitleHeader,
  Pkt
} from '../components/CommonComps/CommonComps'

import endpoints from '../utils/endpoints'
import Loader from '../components/Loader/Loader'
import { fetchJson, useInterval, commafy, formatDate } from '../utils'
import Error from '../components/Error/Error'
const { blkUpApi, blkDownApi, txApi, statsCoinsApi } = endpoints

const renderCoinbase = (cb) => (
  cb.replace(/[a-f0-9]{2}/g, (x) => {
    const cc = Number('0x' + x)
    if (cc >= 32 && cc < 127) {
      return String.fromCharCode(cc)
    }
    return '\\x' + x
  })
)

const inBlock = ({ txData, isUnconfirmed }) => mkRow(
  <>
    In Block
    <Tooltip>
      {txData.blockHash
        ? isUnconfirmed
          ? txData.coinbase
            ? <>This coinbase transaction belongs to block <Link
              to={`/block/${txData.blockHash}`}>{txData.blockHash.slice(0, 8)}</Link>,
              but that block is an <Help.Orphan>orphan</Help.Orphan>.
              Unless the chain re-organizes so this block is nolonger orphaned,
              these mining payouts will not be usable.
            </>
            : <>This transaction has been included in block <Link
              to={`/block/${txData.blockHash}`}>{txData.blockHash.slice(0, 8)}</Link>,
              but that block is an <Help.Orphan>orphan</Help.Orphan>.
              It should be picked up by a miner and included in another block soon.
            </>
          : <>This transaction has been included in block #<Link
            to={`/block/${txData.blockHash}`}>{txData.blockHeight}</Link>.
          </>
        : <>This transaction has not yet been included in a block.</>
      }
    </Tooltip>
  </>,
  <>
    {txData.blockHash && <Link to={`/block/${txData.blockHash}`}>
      {isUnconfirmed
        ? txData.blockHash
        : txData.blockHeight
      }
    </Link>}
    {!txData.blockHash && 'Unconfirmed'}
  </>
)
  


const TxStats = ({ txData, nextBlk, topBlk, statsCoins }) => {
  useEffect(() => {
    document.title = `Pktc - Tx: ${txData.txid}`
  }, [txData])
  let confirmations = 'Unconfirmed'
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
  } else if (topBlk.hash === txData.blockHash) {
    confirmations = 0
  }
  let fee = 0
  if (txData) {
    for (const x of txData.input) { fee += Number(x.value) }
    for (const x of txData.output) { fee -= Number(x.value) }
  }
  let totalFees = 0
  if (statsCoins) {
    // In a coinbase, the "fee" will end up negative because no inputs
    totalFees = -(Number(statsCoins.reward) + fee)
  }
  return (<>
    {mkTitle({
      title: (
        <TitleHeader>
          {txData.coinbase
            ? isUnconfirmed
              ? <><Tooltip type="caution">
                  This coinbase transaction is part of
                  an <Help.Orphan>orphaned block</Help.Orphan> which means it will not be
                  spendable unless the chain re-organizes and the block ceases to be an orphan.
              </Tooltip>Orphaned coinbase transaction</>
              : 'Coinbase transaction'
            : isUnconfirmed
              ? 'Unconfirmed transaction'
              : 'Transaction'}
        </TitleHeader>
      ),
      handle: <HashCont>{txData.txid}</HashCont>,
      copy: txData.txid
    })}
    {mkTable('Summary',
      [
        mkRow(
          <>
            Size (Bytes)
            <Tooltip>
              The number of bytes of data in the transaction.
              {!txData.coinbase &&
                ' Miners require more fees for larger transactions.'
              }
            </Tooltip>
          </>,
          commafy(txData.vsize)
        ),

        txData.coinbase && mkRow(
          <>
            Fees Collected
            <Tooltip>
              The sum of all transaction fees from all of the transactions
              which were included in this block. Fees are spent in
              this coinbase transaction.
            </Tooltip>
          </>,
          statsCoins && <Pkt amt={totalFees}/>
        ),

        txData.coinbase && inBlock({ txData, isUnconfirmed }),

        !txData.coinbase && mkRow(
          <>
            Inputs
            <Tooltip>
              The number of transactions which were spent in order to fund
              this transaction.
            </Tooltip>
          </>,
          commafy(txData.inputCount)
        ),

        mkRow(
          <>
            Lock Time
            <Tooltip>
              If non-zero, this specifies the time when the transaction is
              legal to accept into a block. This is known as
              the <Help.NLockTime>nLocktime</Help.NLockTime> field and is used for
              smart contracts.
            </Tooltip>
          </>,
          txData.locktime
        ),

        mkRow(
          <>
            First Seen
            <Tooltip>
              The time when the block explorer server first detected this transaction.
            </Tooltip>
          </>,
          formatDate(txData.firstSeen)
        )
      ], [
        !txData.coinbase && mkRow(
          <>
            Fee Per Byte
            <Tooltip>
                The amount of fees which this transaction pays to the miner
                for including it in the chain. Note: A transaction with less
                than 0.94 nano-PKTC per byte is considered non-standard by the
                pktd instances and risks not being included in the chain at
                all.
            </Tooltip>
          </>,
          <>
            {(fee / txData.vsize) < 1 &&
                <Tooltip type="caution">
                  A transaction with less than 0.94 nano-PKTC per byte
                  is considered non-standard by the pktd instances and risks
                  not being included in the chain.
                </Tooltip>
            }
            <Pkt amt={fee / txData.vsize} showDecimal/>
          </>
        ),

        txData.coinbase && mkRow(
          <>
            Coinbase
            <Tooltip>
              Coinbase transactions don&apos;t need any inputs to fund them,
              but the software requires all transactions to have at least
              one input. This field is known as the
              <Help.Coinbase>coinbase</Help.Coinbase> and is by miners to
              add metadata to a block.
            </Tooltip>
          </>,
          renderCoinbase(txData.coinbase)
        ),

        txData.coinbase && mkRow(
          <>
            Block Reward
            <Tooltip>
              The coins which are emitted by the blockchain to incentivise
              mining and provide the money supply.
            </Tooltip>
          </>,
          <Pkt amt={statsCoins.reward}/>
        ),

        mkRow(
          <>
            Outputs
            <Tooltip>
              The number of addresses which were paid by this transaction.
            </Tooltip>
          </>,
          commafy(txData.outputCount)
        ),

        !txData.coinbase && inBlock({ txData, isUnconfirmed }),

        mkRow(
          <>
            Confirmations
            <Tooltip>
              {isUnconfirmed
                ? txData.coinbase
                  ? <>This transaction is part of an <Help.Orphan>orphan block</Help.Orphan> so
                  it is unspendable.
                  </>
                  : <>This transaction has not yet been logged in the blockchain.</>
                : <>The number of blocks which have built on top of the block containing
                  this transaction.
                </>
              }
            </Tooltip>
          </>,
          confirmations
        )
      ]
    )}
  </>)
}

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
          fetchJson(`${statsCoinsApi}/${json.blockHeight}`)
            .then((json) => {
              if (json.error) {
                console.log(json.error)
              }
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

  if (txError) return <Error />
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
          <TxBlock txData={txData} key={'coin-0'} view="tx"/>
        </ListCont>
      </>
    }
  </>
}

export default TxScreen
