import React from 'react'
import RichList from '../components/RichList/RichList'
import endpoints from '../utils/endpoints'

import useFetch from '../hooks/useFetch'

const { richLApi } = endpoints

const RichListScreen = (props) => {
  const { error, loading, data } = useFetch(richLApi)
  if (error) return <div>ARRRRR errror</div>
  if (loading) return <RichList />
  return <RichList listData={data.results} />
}

export default RichListScreen
