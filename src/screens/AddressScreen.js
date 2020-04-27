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
import { Button } from '../components/CommonComps/CommonComps'
import Error from '../components/Error/Error'
import CsvDl from '../components/CsvDl/CsvDl'

const { addrMetaApi, base, blkDownApi, nsApi } = endpoints

const ScreenCont = styled.div`
 min-height: 90vh;
 display: flex;
 flex-flow: column nowrap;
`

export const LoadRow = styled.div`
  text-align: center;
  margin: 3rem 0
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
  // const [nsCandidatesNext, setNsCandidatesNext] = useState(false)

  const { addr } = useParams()
  // const { error, loading, data } = useFetch(`${addrMetaApi}/`)
  // if (error) return <div>ARRRRR errror fetching address {addr}</div>
  // if (loading) return <div>fetching addr data</div>
  const loadMore = () => {
    // console.log('load more called, cTab', currTab)
    switch (currTab) {
      case 'Transactions':
        // tx
        nextTx !== '' && fetchJson(`${base}${nextTx}`)
          .then((json) => {
            if (json.error) {
              console.error('caramba err', `${base}${nextTx}`)
              console.error(json.error)
              return
            }
            const newResults = uniqBy([...txList, ...json.results], 'txid')
            setNextTx(json.next)
            setTxList(newResults)
          })
        break
      case 'Mining Income':
        // mining
        fetchJson(`${base}${nextMine}`)
          .then((json) => {
            if (json.error) {
              console.error('caramba err', `${base}${nextMine}`)
              console.error(json.error)
              return
            }

            const newResults = uniqBy([...dailyTr, ...json.results], 'date')

            if (newResults.length === dailyTr.length) return
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
        setDailyTrChart(treatIncome(json.results))
        setNextMine(json.next)
        setDailyTr(json.results)
      })
    // fetch txList
    fetchJson(`${addrMetaApi}/${addr}/coins?mining=excluded`)
      .then((json) => {
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
            setNsFrontrunner(json.results[0])
            setNsCandidates(json.results)
            // setNsCandidatesNext(json.next)
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

        {((currTab === 'Transactions' && noTx === false && txList) || (currTab === 'Mining Income' && dailyTr)) &&
          <>
            {(currTab === 'Mining Income') && <CsvDl />}
            <LoadRow>
              {nextTx !== ''
                ? <Button onClick={loadMore}>Load more {currTab === 'Transactions' ? 'transactions' : ''}</Button>
                : <>𝓣𝓱𝓪𝓽&apos;𝓼 𝓐𝓵𝓵 𝓕𝓸𝓵𝓴𝓼</>
              }
            </LoadRow>
          </>
        }
        {(currTab === 'Transactions' && noTx === true && txList) && <LoadRow>
          This address has not made any transactions yet
        </LoadRow>
        }
      </>
    }

  </ScreenCont>
}

export default AddressScreen
