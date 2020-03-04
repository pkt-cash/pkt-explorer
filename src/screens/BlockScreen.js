import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TxBlock from '../components/TxBlock/TxBlock'

import endpoints from '../utils/endpoints'
import Loader from '../components/Loader/Loader'
import { fetchJson } from '../utils'
const { blockApi } = endpoints

const AddressScreen = (props) => {
  const [blkCoins, setBlkCoins] = useState(false)
  const [blkData, setBlkData] = useState(false)
  const [blkErr, setBlkErr] = useState(false)
  // const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const [coinLoad, setCoinLoad] = useState(true)
  const { id } = useParams()
  // const { error, loading, data } = useFetch(`${addrMetaApi}/`)
  // if (error) return <div>ARRRRR errror fetching address {id}</div>
  // if (loading) return <div>fetching id data</div>
  useEffect(() => {
    // fetch block data
    fetchJson(`${blockApi}/${id}`)
      .then((json) => {
        if (json.error) {
          return setBlkErr(true)
        }
        setBlkData(json)
        setMetaLoad(false)
      })
      // fetch blk coins
    fetchJson(`${blockApi}/${id}/coins`)
      .then((json) => {
        if (json.error) {
          return setBlkErr(true)
        }
        setCoinLoad(false)
        setBlkCoins(json)
      })
  }, [id])
  if (blkErr) return <div>ARRRRR errror fetching address {id}</div>
  return <>
    {metaLoad
      ? <Loader text='loading metadata' />
      : <div>
        got the block metadata for the current block
        {/* {JSON.stringify(blkData)} */}
      </div>
    }
    {coinLoad
      ? <div>loading coins trx</div>
      : <div>
        {/* <TxBlock txData={blkCoins.results[0]}/> */}
        {blkCoins.results && blkCoins.results.map((coinD, i) => <TxBlock txData={coinD} key={`coin-${i}`}/>)}
      </div>
    }
  </>
}

export default AddressScreen
