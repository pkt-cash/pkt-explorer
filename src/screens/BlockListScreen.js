import React from 'react'
import BlockList from '../components/BlockList/BlockList'
import endpoints from '../utils/endpoints'

import useFetch from '../fixtures/hooks/useFetch'

const { blkLApi } = endpoints

const BlockListScreen = (props) => {
  const { error, loading, data } = useFetch(blkLApi)
  if (error) return <div>ARRRRR errror</div>
  if (loading) return <BlockList />
  return <BlockList listData={data.results} />
}

export default BlockListScreen
