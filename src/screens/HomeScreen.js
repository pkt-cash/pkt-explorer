import React, { useState, useEffect } from 'react'
import { fetchJson, treatStats } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import BlockStats from '../components/BlockStats/BlockStats.js'
import endpoints from '../utils/endpoints'
import BlockList from '../components/BlockList/BlockList.js'
const { pkApi, blkLApi } = endpoints
// const { richLApi } = endpoints
// const dData = treatDTx(dummyTxData.results)
const HomeScreen = (props) => {
  // const { error, loading, data } = useFetch(richLApi)
  // if (error) return <div>ARRRRR errror</div>
  // if (loading) return <RichList />
  const [pkData, setPkData] = useState(false)
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
        setBlockList(json.results)
        setPKLoading(false)
      })
    // fetch packet stats
    fetchJson(`${pkApi}/30`)
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
    <HomeStats txData={ pkData } lastBlockData={{}} labelY='diffculty' />
    {/* <BlockStats stats={lastData} /> */}
    <BlockList listData={blockList} home/>
  </div>
}

export default HomeScreen
