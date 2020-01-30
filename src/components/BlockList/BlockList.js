import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BlockListCont = styled.div`

`

const BlockList = ({ listData }) => {
  return (
    listData
      ? <BlockListCont>
        {listData.results.map((blk) => <div key={blk.hash}>{blk.height}</div>)}
      </BlockListCont>
      : <div>loading</div>
  )
}

BlockList.propTypes = {
  listData: PropTypes.array
}

BlockList.defaultProps = {

}

export default BlockList
