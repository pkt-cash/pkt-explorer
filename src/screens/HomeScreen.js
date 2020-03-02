import React, { useState, useEffect } from 'react'
import dummyTxData from '../fixtures/daily.json'
import { treatDTx, fetchJson, treatStats } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import BlockStats from '../components/BlockStats/BlockStats.js'
import dummyBlockData from '../fixtures/blockStats.json'
import endpoints from '../utils/endpoints'
const { pkApi, blkLApi } = endpoints
// const { richLApi } = endpoints
// const dData = treatDTx(dummyTxData.results)
const HomeScreen = (props) => {
  // const { error, loading, data } = useFetch(richLApi)
  // if (error) return <div>ARRRRR errror</div>
  // if (loading) return <RichList />
  const [pkData, setPkData] = useState(false)
  const [lastData, setLastData] = useState(false)
  const [blockList, setBlockList] = useState(false)
  const [isPkLoading, setPKLoading] = useState(true)
  const [hasErr, setErr] = useState(false)

  useEffect(() => {
    // fetch blockList (first 20)
    fetchJson(`${blkLApi}/20`)
      .then((json) => {
        if (json.error) {
          console.log('error while fetching blocks')
          setPKLoading(false)
          return setErr(json.error)
        }
        const last = json.results[0]
        console.log('da last', last)
        
        fetchJson(`${blkLApi}/20`)
          .then((json) => {
            if (json.error) {
              console.log('error while last block data')
              setPKLoading(false)
              return setErr(json.error)
            }
            setBlockList(json.results)
            setPKLoading(false)
          })
        setLastData(last)
        setBlockList(json.results)
        setPKLoading(false)
      })
    // fetch packet stats
    fetchJson(`${pkApi}/15`)
      .then((json) => {
        if (json.error) {
          console.log('error while fetching pkData')
          setPKLoading(false)
          return setErr(json.error)
        }
        const res = treatStats(json.results)
        // console.log(res)
        setPkData(res)
        setPKLoading(false)
      })
      // fetch blk coins
  }, [])

  return <div>
    <HomeStats txData={ pkData } lastBlockData={{}}labelY='diffculty' />
    <BlockStats stats={lastData} />
  </div>
}

export default HomeScreen
