import React, { useState, useEffect } from 'react'
import endpoints from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import AddrStats from '../components/AddressStats/AddressStats'
import { treatIncome, fetchJson } from '../utils'
import AddrTxBlock from '../components/AddrTxBlock/AddrTxBlock'
import Loader from '../components/Loader/Loader'
import styled from 'styled-components'
import TabHeaders from '../components/TabHeaders/TabHeaders'
import DailyList from '../components/DailyList/DailyList'
const { addrMetaApi } = endpoints

const ScreenCont = styled.div`
 min-height: 90vh;
 display: flex;
 flex-flow: column nowrap;
`

const tabs = [
  { name: 'Transaction', action: () => { console.log('yo') } },
  { name: 'daily inc', action: () => { console.log('yi') } }
]

const tabContent = (cTab, txList, dailyTr, addr) => {
  switch (cTab) {
    case 0:
      return txList
        ? txList.results.map((item, k) => <AddrTxBlock txData={item} myAddr={addr} key={`tx-${k}`} />)
        : <Loader text='Loading loading metadata' small/>
    case 1:
      return dailyTr
        ? <DailyList dData={dailyTr}/>
        : <Loader text='Daily income' small/>
    default:
      return <div>this is not the tab you are looking for</div>
  }
}

const AddressScreen = (props) => {
  const [currTab, changeTab] = useState(0)
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
    <TabHeaders tabsData={tabs} action={changeTab} cTab={currTab}/>
    {tabContent(currTab, txList, dailyTr, addr)}
  </ScreenCont>
}

export default AddressScreen
