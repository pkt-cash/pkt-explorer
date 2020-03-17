import React, { useState, useEffect } from 'react'
import { fetchJson } from '../utils'
import endpoints from '../utils/endpoints'
import DailyTx from '../components/DailyTx/DailyTx'
const { txStats } = endpoints

const DailyTxScreen = (props) => {
  const [txData, setTxData] = useState(false)
  const [hasErr, setErr] = useState(false)
  if (hasErr) console.error(hasErr)
  useEffect(() => {
    // fetch daily transactions
    fetchJson(`${txStats}`)
      .then((json) => {
        if (json.error) {
          console.error('error while fetching blocks')
          return setErr(json.error)
        }
        setTxData(json.results)
      })
  }, [])

  return <DailyTx txData={txData}/>
}

export default DailyTxScreen
