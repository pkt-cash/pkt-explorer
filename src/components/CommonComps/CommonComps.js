// import React from 'react'
import styled from 'styled-components'
import metrics from '../../theme/metrics'

export const MainWrapper = styled.div`
  max-width: ${metrics.fullW}px;
  margin: 0 auto;
`

export const MenuCont = styled.div`
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${metrics.menuHeight}px;
  background-color: ${({ theme }) => theme.colors.pktBlue};
  color: #fff;
`
