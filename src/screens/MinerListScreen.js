import React, { useState, useEffect } from 'react'
import RichList from '../components/RichList/RichList'
import endpoints from '../utils/endpoints'
import { uniqBy } from 'lodash-es'
import { Button, BtRow } from '../components/CommonComps/CommonComps'
import { fetchJson } from '../utils'

const { minerLApi } = endpoints

const MinerListScreen = (props) => {
  const [currPage, setCurrPage] = useState(1)
  const [richList, setRichList] = useState(false)
  const [nextRich, setNextRich] = useState(false)
  // run once per page load + on change rich page
  useEffect(() => {
    document.title = 'Most profitable miners (1 day lag)'
    fetchJson(`${minerLApi}/100/${currPage}`)
      .then((json) => {
        if (json.error) { return console.error(json.error) }
        for (const r of json.results) {
            r.balance = r.received;
        }
        if (richList) {
          setRichList(uniqBy([...richList, ...json.results], 'address'))
        } else {
          setRichList(json.results)
        }
        setNextRich(json.next);
      })
  }, [currPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMoreRiches = () => {
    setCurrPage(currPage + 1)
  }

  return <>
    <RichList listData={richList} name="top miners" cells={{ address: 'Address', balance: 'Mined yesterday' }} />
    {richList &&
    <BtRow>
        {nextRich !== ''
          ? <Button onClick={loadMoreRiches}>Load more</Button>
          : <>No more miners</>
        }
      </BtRow>
    }
  </>
}

export default MinerListScreen
