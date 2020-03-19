import React from 'react'
import BlockList from '../components/BlockList/BlockList'
import endpoints from '../utils/endpoints'

import useFetch from '../hooks/useFetch'

const { blkDownApi } = endpoints

const BlockListScreen = (props) => {
  const { error, loading, data } = useFetch(blkDownApi)
  if (error) return <div>ARRRRR errror</div>
  if (loading) return <BlockList />
  return <BlockList listData={data.results} />
}

export default BlockListScreen
