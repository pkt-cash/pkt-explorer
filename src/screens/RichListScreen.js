import React, { useState, useEffect } from 'react'
import RichList from '../components/RichList/RichList'
import endpoints from '../utils/endpoints'
import { uniqBy } from 'lodash-es'
import { Button, BtRow } from '../components/CommonComps/CommonComps'
import { fetchJson } from '../utils'

const { richLApi } = endpoints

const RichListScreen = (props) => {
  const [currPage, setCurrPage] = useState(1)
  const [richList, setRichList] = useState(false)
  const [nextRich, setNextRich] = useState(false)

  useEffect(() => {
    document.title = 'Pkt - Rich list'
    fetchJson(`${richLApi}/100/${currPage}`)
      .then((json) => {
        if (json.error) { return void console.error(json.error) }
        if (richList) setRichList(uniqBy([...json.results, ...richList], 'address'))
        else setRichList(json.results)
      })
  }, [])

  const loadMoreRiches = () => {
    fetchJson(`${richLApi}/100/${currPage + 1}`)
      .then((json) => {
        if (json.error) { return void console.error(json.error) }
        const newList = uniqBy([...richList, ...json.results], 'address')
        setRichList(newList)
        setNextRich(json.next)
        setCurrPage(currPage + 1)
      })
  }

  return <>
    <RichList listData={richList} />
    <BtRow>
      {nextRich !== ''
        ? <Button onClick={loadMoreRiches}>More Riches !!!</Button>
        : <>You, brave valient clicker, have clicked all the way to the end of
        the list. The power of your thumb is beyond even the expectation of
        the authors of this explorer and to you, I have only one thing to say:
        Never gonna give you up, never gonna let you down, never gonna run
        around and desert you. Never gonna make you cry, never gonna say goodbye.
        Never gonna tell a lie and hurt you.
        </>
      }
    </BtRow>
  </>
}

export default RichListScreen
