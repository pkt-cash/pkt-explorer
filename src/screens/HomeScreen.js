import React, { useState, useEffect } from 'react'
import { fetchJson, treatStats, useInterval } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import endpoints from '../utils/endpoints'
import BlockList from '../components/BlockList/BlockList.js'
const { pkApi, blkDownApi } = endpoints

const HomeScreen = (props) => {
  const [pkData, setPkData] = useState(false)
  const [blockList, setBlockList] = useState(false)
  const [hasErr, setErr] = useState(false)

  if (hasErr) console.error(hasErr)

  const loadBlocks = () => {
    // fetch blockList (first 20)
    fetchJson(`${blkDownApi}/20`)
      .then((json) => {
        if (json.error) setErr(json.error)
        setBlockList(json.results)
      })
  };

  useEffect(() => {
    loadBlocks();

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
  useInterval(() => {
    loadBlocks();
  }, 30000)

  return <>
    <HomeStats txData={ pkData } lastBlockData={{}} labelY='diffculty' />
    <BlockList listData={blockList} home/>
  </>
}

export default HomeScreen
