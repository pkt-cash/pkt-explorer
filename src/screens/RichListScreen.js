import React, { useState, useEffect } from 'react'
import RichList from '../components/RichList/RichList'
import endpoints from '../utils/endpoints'
import { uniqBy } from 'lodash-es'
import useFetch from '../hooks/useFetch'
import { Button, BtRow } from '../components/CommonComps/CommonComps'
import { fetchJson } from '../utils'

const { richLApi } = endpoints

const RichListScreen = (props) => {
  const [currPage, setCurrPage] = useState(1)
  const [richList, setRichList] = useState(false)
  const [hasErr, setErr] = useState(false)

  useEffect(() => {
    fetchJson(`${richLApi}/40/${currPage}`)
      .then((json) => {
        if (json.error) { return void setErr(json.error) }
        if (richList) setRichList(uniqBy([...json.results, ...richList], 'address'))
        else setRichList(json.results)
      })
  }, [])

  const loadMoreRiches = () => {
    fetchJson(`${richLApi}/40/${currPage + 1}`)
      .then((json) => {
        if (json.error) setErr(json.error)
        const newList = uniqBy([...richList, ...json.results], 'address')
        setRichList(newList)
        setCurrPage(currPage + 1)
      })
  }

  return <>
    <RichList listData={richList} />
    <BtRow>
      <Button onClick={loadMoreRiches}>More Riches !!!</Button>
    </BtRow>
  </>
}

export default RichListScreen
