import React from 'react'
import ToolTip from 'react-png-tooltip'
import styled from 'styled-components'

const Ttc = styled.span`
    white-space: normal;
`

const TTCont = styled.span`
  position: relative;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-left: 5px;
  > span{
    position: absolute;
    top: -16 px;
    /* z-index: 20; */
  }
`

const TTip = ({ children, type, tooltip }) => {
  if (type === 'caution') {
    tooltip = <span>{'\u26A0\uFE0F'}</span>
  } else if (type === 'blueDiamond') {
    tooltip = <span>{'\uD83D\uDD39'}</span>
  }
  return type === 'caution'
    ? <ToolTip tooltip={tooltip}>
      <Ttc>{children}</Ttc>
    </ToolTip>
    : <TTCont>
      <ToolTip tooltip={tooltip}>
        <Ttc>{children}</Ttc>
      </ToolTip>
    </TTCont>
}

export default TTip
