import React from 'react'
import ToolTip from 'react-png-tooltip'
import styled from 'styled-components'

const Ttc = styled.span`
    white-space: normal;
`

export default ({children, type, tooltip}) => {
    if (type === 'caution') {
        tooltip = <span>{"\u26A0\uFE0F"}</span>;
    } else if (type === 'blueDiamond') {
        tooltip = <span>{"\uD83D\uDD39"}</span>;
    }
    return <ToolTip tooltip={tooltip}>
        <Ttc>{children}</Ttc>
    </ToolTip>
}