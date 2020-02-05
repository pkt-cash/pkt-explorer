import React from 'react'
// import endpoints from '../utils/endpoints'
// import useFetch from '../hooks/useFetch'
import dummyTxData from '../fixtures/daily.json'
import { treatDTx } from '../utils'
import HomeStats from '../components/HomeStats/HomeStats'
import BlockStats from '../components/BlockStats/BlockStats.js'
import dummyBlockData from '../fixtures/blockStats.json'
const dData = treatDTx(dummyTxData.results)
// const { richLApi } = endpoints

const HomeScreen = (props) => {
  // const { error, loading, data } = useFetch(richLApi)
  // if (error) return <div>ARRRRR errror</div>
  // if (loading) return <RichList />
  return <div>
    <HomeStats txData={ dData }/>
    <BlockStats stats={dummyBlockData} />
  </div>
}

export default HomeScreen
