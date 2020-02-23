import React, { useState, useEffect }from 'react'
import RichList from '../components/RichList/RichList'
import endpoints from '../utils/endpoints'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import AddrStats from '../components/AddressStats/AddressStats'
import { treatIncome } from '../utils'
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
  const [metaLoad, setMetaLoad] = useState(true)
  let { addr } = useParams()
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
        console.log('meta', json)
        setMeta(json)
        setMetaLoad(false)
      })
    fetchJson(`${addrMetaApi}/${addr}/income/30`)
      .then((json) => {
        setDailyTr(treatIncome(json.result))
      })
  }, [])
  if (metaErr) return <div>ARRRRR errror fetching address {addr}</div>
  return <div>
    {metaLoad
      ? <div>loading metadata</div>
      : <AddrStats meta={meta} addr={addr} dailyTr={dailyTr}/>
    }
  </div>
}

export default AddressScreen
