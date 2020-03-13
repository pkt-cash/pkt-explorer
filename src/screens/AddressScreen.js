import React, { useState, useEffect } from 'react'
import endpoints from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import AddrStats from '../components/AddressStats/AddressStats'
import { treatIncome, fetchJson } from '../utils'
import AddrTxBlock from '../components/AddrTxBlock/AddrTxBlock'
import Loader from '../components/Loader/Loader'
import styled from 'styled-components'
const { addrMetaApi } = endpoints

const ScreenCont = styled.div`
 min-height: 90vh;
 display: flex;
 flex-flow: column nowrap;
`

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
    fetchJson(`${addrMetaApi}/${addr}/income/90?mining=only`)
      .then((json) => {
        setDailyTr(treatIncome(json.result))
      })
    // fetch txList
    fetchJson(`${addrMetaApi}/${addr}/coins?mining=excluded`)
      .then((json) => {
        setTxList(json)
      })
  }, [addr])
  if (metaErr) return <div>ARRRRR errror fetching address {addr}</div>
  return <ScreenCont>
    {metaLoad
      ? <Loader text='Loading loading metadata' small/>
      : <AddrStats meta={meta} addr={addr} dailyTr={dailyTr}/>
    }
    {txList.results
      ? txList.results.map((item, k) => <AddrTxBlock txData={item} myAddr={addr} key={`tx-${k}`} />)
      : <Loader text='Loading address data'/>
    }
  </ScreenCont>
}

export default AddressScreen
