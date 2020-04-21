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
import CandidateList from '../components/CandidateList/CandidateList'
import { BtRow, Button } from '../components/CommonComps/CommonComps'
import Error from '../components/Error/Error'

const { addrMetaApi, base, blkDownApi, nsApi } = endpoints

const ScreenCont = styled.div`
 min-height: 90vh;
 display: flex;
 flex-flow: column nowrap;
`

const tabs = [
  { name: 'Transactions' },
  { name: 'Mining Income' }
]
const tabsNs = [
  { name: 'Transactions' },
  { name: 'Election candidates' }
]

const tabContent = ({ currTab, txList, dailyTr, addr, nsCandidates }) => {
  switch (currTab) {
    case 'Transactions':
      return txList
        ? txList.map((item, k) => <AddrTxBlock txData={item} myAddr={addr} key={`tx-${k}`} />)
        : <Loader text='Loading metadata' small/>
    case 'Mining Income':
      return dailyTr
        ? <DailyList dData={dailyTr}/>
        : <Loader text='Daily income' small/>
    case 'Election candidates':
      return nsCandidates
        ? <CandidateList dData={nsCandidates} addr={addr}></CandidateList>
        : <Loader text='Election candidates' small/>
    default:
      return <div>this is not the tab you are looking for</div>
  }
}

const AddressScreen = (props) => {
  const [currTab, changeTab] = useState('Transactions')
  const [meta, setMeta] = useState(false)
  const [nextTx, setNextTx] = useState(false)
  const [nextMine, setNextMine] = useState(false)
  const [dailyTrChart, setDailyTrChart] = useState(false)
  const [dailyTr, setDailyTr] = useState(false)
  const [metaErr, setMetaErr] = useState(false)
  const [txList, setTxList] = useState(false)
  const [metaLoad, setMetaLoad] = useState(true)
  const [noTx, setNoTx] = useState(false)

  const [isNs, setIsNs] = useState(false)
  const [nsError, setNsError] = useState(false)
  const [ns, setNs] = useState(false)
  const [nsFrontrunner, setNsFrontrunner] = useState(false)
  const [nsCandidates, setNsCandidates] = useState(false)
  const [nsCandidatesNext, setNsCandidatesNext] = useState(false)

  const { addr } = useParams()
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
              return
            }
            const newResults = uniqBy([...txList, ...json.results], 'txid')
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
              console.log('caramba err', `${base}${nextMine}`)
              console.error(json.error)
              return
            }

            const newResults = uniqBy([...dailyTr, ...json.result], 'date')

            if (newResults.length === dailyTr.length) return console.log('this is the end')
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
    setMetaLoad(true)
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
    fetchJson(`${blkDownApi}/1/1`)
      .then((json) => {
        if (json.error) {
          return
        }
        // check if this address is the NS
        if (json.results[0].networkSteward !== addr) { return }
        setIsNs(true)
        fetchJson(nsApi)
          .then((json) => {
            if (json.error) {
              setNsError(json.error)
              return
            }
            setNs(json)
          })
        fetchJson(`${nsApi}/candidates`)
          .then((json) => {
            if (json.error) {
              setNsError(json.error)
              return
            }
            setNsFrontrunner(json.result[0])
            setNsCandidates(json.result)
            setNsCandidatesNext(json.next)
          })
      })
  }, [addr])

  if (metaErr) return <Error addrErr /> // TODO: make a proper error component
  return <ScreenCont>
    {metaLoad
      ? <Loader text='Loading address data' small/>
      : <>
        <AddrStats meta={meta} addr={addr} dailyTr={dailyTrChart}
          isNs={isNs} nsError={nsError} ns={ns} nsFrontrunner={nsFrontrunner}/>
        {isNs
          ? <TabHeaders tabsData={tabsNs} action={changeTab} cTab={currTab}/>
          : <TabHeaders tabsData={tabs} action={changeTab} cTab={currTab}/>
        }
        {tabContent({ currTab, txList, dailyTr, addr, nsCandidates })}

        {((currTab === 0 && noTx === false && txList) || (currTab === 1 && dailyTr)) &&
          <BtRow>
            {nextTx !== ''
              ? <Button onClick={loadMore}>Load more {currTab === 0 ? 'transactions' : ''}</Button>
              : <>𝓣𝓱𝓪𝓽&apos;𝓼 𝓐𝓵𝓵 𝓕𝓸𝓵𝓴𝓼</>
            }
          </BtRow>
        }
        {(currTab === 0 && noTx === true && txList) && <BtRow>
          This address has not made any transactions yet
        </BtRow>
        }
      </>
    }

  </ScreenCont>
}

export default AddressScreen
