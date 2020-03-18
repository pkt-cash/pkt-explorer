import React, { useState, useEffect } from 'react'
import endpoints from '../utils/endpoints'
import { useParams } from 'react-router-dom'
import AddrStats from '../components/AddressStats/AddressStats'
import { uniqBy } from 'lodash-es'
import { treatIncome, fetchJson } from '../utils'
import AddrTxBlock from '../components/AddrTxBlock/AddrTxBlock'
import Loader from '../components/Loader/Loader'
import styled from 'styled-components'
import TabHeaders from '../components/TabHeaders/TabHeaders'
import DailyList from '../components/DailyList/DailyList'
import { BtRow, Button } from '../components/CommonComps/CommonComps'

const { addrMetaApi, base } = endpoints

const ScreenCont = styled.div`
 min-height: 90vh;
 display: flex;
 flex-flow: column nowrap;
`

const tabs = [
  { name: 'Transactions', action: () => { console.log('yo') } },
  { name: 'Mining Income', action: () => { console.log('yi') } }
]

const tabContent = (cTab, txList, dailyTr, addr) => {
  switch (cTab) {
    case 0:
      return txList
        ? txList.map((item, k) => <AddrTxBlock txData={item} myAddr={addr} key={`tx-${k}`} />)
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
  const [nextTx, setNextTx] = useState(false)
  const [nextMine, setNextMine] = useState(false)
  const [dailyTrChart, setDailyTrChart] = useState(false)
  const [dailyTr, setDailyTr] = useState(false)
  const [metaErr, setMetaErr] = useState(false)
  const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const [noTx, setNoTx] = useState(false)
  const { addr } = useParams()
  const [hasErr, setErr] = useState(false)
  // const { error, loading, data } = useFetch(`${addrMetaApi}/`)
  // if (error) return <div>ARRRRR errror fetching address {addr}</div>
  // if (loading) return <div>fetching addr data</div>
  const loadMore = () => {
    console.log('load more called, cTab', currTab)
    switch (currTab) {
      case 0:
        console.log('load tx', nextTx)
        // tx
        nextTx !== '' && fetchJson(`${base}${nextTx}`)
          .then((json) => {
            if (json.error) { 
              console.log('caramba err', `${base}${nextTx}`)
              console.error(json.error)
              return void setErr(json.error)
            }
            const newResults = uniqBy([...txList, ...json.results])
            console.log('tx new next', json.next)
            setNextTx(json.next)
            setTxList(newResults)
          })
        break
      case 1:
        console.log('load mining', nextMine)
        // mining
        fetchJson(`${base}${nextMine}`)
          .then((json) => {
            if (json.error) {
              console.log('nextMine:', nextMine)
              console.log('caramba err', `${base}${nextMine}`)
              console.error(json.error)
              return void setErr(json.error)
            }
            const newResults = uniqBy([...txList, ...json.result])
            console.log('new / old', newResults.length, txList.length)
            if (newResults.length === dailyTr.length) console.log('this is the end')
            console.log('mining new next', json.next)
            if (json.next) setNextTx(json.next)
            setDailyTr(newResults)
          })
        break
      default:
        break
    }
  }
  useEffect(() => {
    document.title = `Pkt - Address: ${addr}`
  }, [addr])
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
    // fetch last 90 day incomes
    fetchJson(`${addrMetaApi}/${addr}/income/90?mining=only`)
      .then((json) => {
        setDailyTrChart(treatIncome(json.result))
        setNextMine(json.next)
        setDailyTr(json.result)
      })
    // fetch txList
    fetchJson(`${addrMetaApi}/${addr}/coins?mining=excluded`)
      .then((json) => {
        console.log('got tx')
        console.log(json)
        if (json.results.length === 0) setNoTx(true)
        setNextTx(json.next)
        setTxList(json.results)
      })
  }, [addr])

  if (metaErr) return <div>ARRRRR errror fetching address {addr}</div> // TODO: make a proper error component
  return <ScreenCont>
    {metaLoad
      ? <Loader text='Loading loading metadata' small/>
      : <AddrStats meta={meta} addr={addr} dailyTr={dailyTrChart}/>
    }
    <TabHeaders tabsData={tabs} action={changeTab} cTab={currTab}/>
    {tabContent(currTab, txList, dailyTr, addr)}

    {((currTab === 0 && noTx === false && txList) || (currTab === 1 && dailyTr)) &&
      <BtRow>
        <Button onClick={loadMore}>Load more {currTab === 0 ? 'transaction': 'mining incomes'}</Button>
      </BtRow>
    }
    {(currTab === 0 && noTx === true && txList) && <BtRow>
      No transaction
    </BtRow>
    }
    
  </ScreenCont>
}

export default AddressScreen
