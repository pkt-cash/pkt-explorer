import React, { useState, useEffect } from 'react'
import endpoints from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import TxBlock from '../components/TxBlock/TxBlock'

const { blockApi } = endpoints

const fetchJson = async (url) => {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    console.log('error fetching ressource')
    return { error }
  }
}

const AddressScreen = (props) => {
  const [blkCoins, setBlkCoins] = useState(false)
  const [blkData, setBlkData] = useState(false)
  const [blkErr, setBlkErr] = useState(false)
  const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const [coinLoad, setCoinLoad] = useState(true)
  const { id } = useParams() || '13505f30ddfab5994fdd7b2f81e6d68aaf753ca99f1aa173c46c8772ad1f6cce'
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
        console.log(json)
        setBlkData(json)
        setMetaLoad(false)
      })
      // fetch blk coins
    fetchJson(`${blockApi}/${id}/coins`)
      .then((json) => {
        if (json.error) {
          return setBlkErr(true)
        }
        // console.log(json.results)
        setCoinLoad(false)
        setBlkCoins(json)
      })
  }, [id])
  if (blkErr) return <div>ARRRRR errror fetching address {id}</div>
  return <>
    {metaLoad
      ? <div>loading metadata</div>
      : <div>
        got the block metadata for {id}
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
