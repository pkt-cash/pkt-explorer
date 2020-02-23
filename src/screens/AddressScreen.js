import React, { useState, useEffect } from 'react'
import endpoints from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import AddrStats from '../components/AddressStats/AddressStats'
import { treatIncome } from '../utils'
import TxBlock from '../components/TxBlock/TxBlock'
const { addrMetaApi } = endpoints

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
  const [meta, setMeta] = useState(false)
  const [dailyTr, setDailyTr] = useState(false)
  const [metaErr, setMetaErr] = useState(false)
  const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const { addr } = useParams()
  // const { error, loading, data } = useFetch(`${addrMetaApi}/`)
  // if (error) return <div>ARRRRR errror fetching address {addr}</div>
  // if (loading) return <div>fetching addr data</div>
  useEffect(() => {
    // fetchAddrMeta
    fetchJson(`${addrMetaApi}/${addr}`)
      .then((json) => {
        if (json.error) {
          setMetaErr(true)
        }
        setMeta(json)
        setMetaLoad(false)
      })
    // fetch last 30 day incomes
    fetchJson(`${addrMetaApi}/${addr}/income/30`)
      .then((json) => {
        setDailyTr(treatIncome(json.result))
      })
    // fetch txList
    console.log(`${addrMetaApi}/${addr}/coins?nomine=1`)
    fetchJson(`${addrMetaApi}/${addr}/coins?nomine=1`)
      .then((json) => {
        console.log(json)
        setTxList(json)
      })
  }, [addr])
  if (metaErr) return <div>ARRRRR errror fetching address {addr}</div>
  return <div>
    {metaLoad
      ? <div>loading metadata</div>
      : <AddrStats meta={meta} addr={addr} dailyTr={dailyTr}/>
    }
    {txList.results && txList.results.map((item, k) => <TxBlock txData={item} key={`tx-${k}`} />)}
  </div>
}

export default AddressScreen
