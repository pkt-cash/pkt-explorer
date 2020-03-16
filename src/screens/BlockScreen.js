import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TxBlock from '../components/TxBlock/TxBlock'
import BlockStats from '../components/BlockStats/BlockStats'
import { ListLabelCont, ListCont, ListLabel } from '../components/CommonComps/CommonComps'

import endpoints from '../utils/endpoints'
import Loader from '../components/Loader/Loader'
import { fetchJson, useInterval } from '../utils'
const { blockApi, pcBlockApi, blkUpApi, blkDownApi } = endpoints

export default (props) => {
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
          console.log(json.error)
        }
        setTopBlk(json.results[0])
      })
  }
  useInterval(getTop, 30000)

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
        fetchJson(`${blkUpApi}/1/${json.height + 2}}`)
          .then((json) => {
            if (json.error) {
              console.log(json.error)
            }
            // console.log('xxx', json);
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
          console.log(json.error)
          return setBlkErr(true)
        }
        setBlkPc(json)
      })

    // Get the top for the number of confirmations
    getTop()
  }, [id])

  if (blkErr) return <div>Error fetching block {id}</div>
  // console.log(blkData)
  return <>
    {(() => {
      if (metaLoad) {
        return <Loader text='Loading Block' />
      } else {
        const out = [<BlockStats stats={blkData} blkPc={blkPc} nextBlk={nextBlk} topBlk={topBlk} />]
        if (coinLoad || !blkCoins.results) {
          out.push(<Loader text='Loading Transactions' />)
        } else {
          out.push(<ListCont>
            <ListLabelCont>
              <ListLabel>Transactions</ListLabel>
            </ListLabelCont>
            {blkCoins.results.map((coinD, i) => <TxBlock txData={coinD} key={`coin-${i}`} view="block"/>)}
          </ListCont>)
        }
        return out
      }
    })()}
  </>
}
