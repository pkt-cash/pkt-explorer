import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import styled from 'styled-components'
import PropTypes from 'prop-types'
import BlockList from '../components/BlockList/BlockList'
import { blkLApi } from '../utils/endpoints'
const BlockListScreen = (props) => {
  const [blDate, setData] = useState(null)

  useEffect(async () => {
    try {
      const result = await axios(
        'https://alpha-pkt-explorer.cjdns.fr/api/v1/PKT/pkt/chain/down/'
        // 'https://hn.algolia.com/api/v1/search?query=redux'
      )
      console.log(result)
      setData(result.data.results)
    } catch (error) {
      console.log(error)
    }
    // setData(result.data.results)
  }, [])

  return (
    <div>
      BlockListScreen
      <BlockList listData={blDate} />
    </div>
  )
}

BlockListScreen.propTypes = {
  
}

BlockListScreen.defaultProps = {
  
}

export default BlockListScreen
