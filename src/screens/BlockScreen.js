import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TxBlock from '../components/TxBlock/TxBlock'
import BlockStats from '../components/BlockStats/BlockStats'
import { ListLabelCont, ListCont, ListLabel } from '../components/CommonComps/CommonComps'

import endpoints from '../utils/endpoints'
import Loader from '../components/Loader/Loader'
import { fetchJson, useInterval } from '../utils'
import Error from '../components/Error/Error'
const { blockApi, pcBlockApi, blkUpApi, blkDownApi } = endpoints

const BlockScreen = (props) => {
  const [nextBlk, setNextBlk] = useState(false)
  const [blkPc, setBlkPc] = useState(false)
  const [blkCoins, setBlkCoins] = useState(false)
  const [blkData, setBlkData] = useState(false)
  const [topBlk, setTopBlk] = useState(false)
  const [blkErr, setBlkErr] = useState(false)
  // const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const [coinLoad, setCoinLoad] = useState(true)
  const { id } = useParams()
  // const { error, loading, data } = useFetch(`${addrMetaApi}/`)
  // if (error) return <div>ARRRRR errror fetching address {id}</div>
  // if (loading) return <div>fetching id data</div>
  // console.log(blkData)

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
    document.title = `Pkt - Block: ${id}`
  }, [id])

  useEffect(() => {
    // fetch block data
    fetchJson(`${blockApi}/${id}`)
      .then((json) => {
        if (json.error) {
          return setBlkErr(true)
        }
        setBlkData(json)
        setMetaLoad(false)

        // Next block data (to verify the block is in the main chain)
        setNextBlk(false)
        fetchJson(`${blkUpApi}/1/${json.height + 2}`)
          .then((json) => {
            if (json.error) {
              console.error(json.error)
            }
            setNextBlk(json)
          })
      })

    // fetch blk coins
    fetchJson(`${blockApi}/${id}/coins`)
      .then((json) => {
        if (json.error) {
          return setBlkErr(true)
        }
        setBlkCoins(json)
        setCoinLoad(false)
      })

    // PacketCrypt data
    fetchJson(`${pcBlockApi}/${id}`)
      .then((json) => {
        if (json.error) {
          console.info(json.error)
          return setBlkErr(true)
        }
        setBlkPc(json)
      })

    // Get the top for the number of confirmations
    getTop()
  }, [id])

  if (blkErr) return <Error />
  // console.log(blkData)
  return <>
    {metaLoad
      ? <Loader text='Loading Block' />
      : <>
        <BlockStats stats={blkData} blkPc={blkPc} nextBlk={nextBlk} topBlk={topBlk} />
        {(coinLoad || !blkCoins.results)
          ? <Loader text='Loading Transactions' />
          : <ListCont>
            <ListLabelCont>
              <ListLabel>Transactions</ListLabel>
            </ListLabelCont>
            {blkCoins.results.map((coinD, i) => <TxBlock txData={coinD} key={`coin-${i}`} view="block"/>)}
          </ListCont>
        }
      </>
    }
  </>
}

export default BlockScreen
