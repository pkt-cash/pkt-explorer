import React, { useState, useEffect } from 'react'
import { fetchJson, treatStats, useInterval } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import endpoints from '../utils/endpoints'
import BlockList from '../components/BlockList/BlockList.js'
import { uniqBy } from 'lodash-es'
import { Button, BtRow } from '../components/CommonComps/CommonComps'
const { pkApi, blkDownApi, statsCoinsApi } = endpoints

const HomeScreen = (props) => {
  const [pkData, setPkData] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [blockList, setBlockList] = useState(false)
  const [statsCoins, setStatsCoins] = useState(false)
  const [hasErr, setErr] = useState(false)

  if (hasErr) console.error(hasErr)

  useEffect(() => {
    document.title = 'Pkt - Home'
  }, [])

  const topBlock = -1
  const loadBlocks = (then) => {
    // fetch blockList (first 20)
    fetchJson(`${blkDownApi}/20`)
      .then((json) => {
        if (json.error) { return setErr(json.error) }
        if (blockList) setBlockList(uniqBy([...json.results, ...blockList], 'hash'))
        else setBlockList(json.results)
      })

    fetchJson(`${statsCoinsApi}${(topBlock >= 0) ? `/${topBlock}` : ''}`).then((json) => {
      setStatsCoins(json)
    })
  }
  useInterval(() => {
    loadBlocks()
  }, 30000)

  const loadMoreBlock = () => {
    fetchJson(`${blkDownApi}/20/${currPage + 1}`)
      .then((json) => {
        if (json.error) setErr(json.error)
        const newList = uniqBy([...blockList, ...json.results], 'hash')
        // setTimeout(() => {
        //   window.scrollTo(0, document.body.scrollHeight)
        // }, 200) // TODO: (jerome) smooth scroll, no scroll ?
        setBlockList(newList)
        setCurrPage(currPage + 1)
      })
  }

  useEffect(() => {
    loadBlocks()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <HomeStats txData={pkData} blockList={blockList} statsCoins={statsCoins} lastBlockData={{}} labelY='diffculty' />
    <BlockList listData={blockList} home/>
    <BtRow>
      <Button onClick={loadMoreBlock}>More blocks</Button>
    </BtRow>
  </>
}

export default HomeScreen
