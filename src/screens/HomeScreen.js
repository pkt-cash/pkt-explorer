import React, { useState, useEffect } from 'react'
import { fetchJson, treatStats } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import endpoints from '../utils/endpoints'
import BlockList from '../components/BlockList/BlockList.js'
const { pkApi, blkLApi } = endpoints

const HomeScreen = (props) => {
  const [pkData, setPkData] = useState(false)
  const [blockList, setBlockList] = useState(false)
  const [hasErr, setErr] = useState(false)

  if (hasErr) console.error(hasErr)

  useEffect(() => {
    // fetch blockList (first 20)
    fetchJson(`${blkLApi}/20`)
      .then((json) => {
        if (json.error) setErr(json.error)
        setBlockList(json.results)
      })
    // fetch packet stats
    fetchJson(`${pkApi}/30`)
      .then((json) => {
        if (json.error) {
          console.error('error while fetching pkData')
          return setErr(json.error)
        }
        const res = treatStats(json.results)

        setPkData(res)
      })
  }, [])

  return <>
    <HomeStats txData={ pkData } lastBlockData={{}} labelY='diffculty' />
    <BlockList listData={blockList} home/>
  </>
}

export default HomeScreen
