import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import metrics, { mqs } from '../../theme/metrics'
import PropTypes from 'prop-types'
import { displayPKT, commafy } from '../../utils'

export const MainWrapper = styled.div`
  max-width: ${metrics.fullW}px;
  margin: 0 auto;
  text-align: left;
`

export const BtRow = styled.div`
  margin: 3rem 0;
  text-align: center;
`

export const Button = styled.div`
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: ${({ theme }) => theme.colors.headerBackground};
    border-radius: 3px;

  &:hover,
  &:focus {
      background: #0053ba;
  }

  &:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }

  &:active {
      transform: scale(0.99);
  }
`

export const MenuCont = styled.div`
  /* text-align: center; */
  /* display: flex;
  align-items: flex-start;
  justify-content: center; */
  padding-left: 60px;
  height: ${metrics.menuHeight}px;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: #fff;
`

export const ListCell = styled.div`
  display: flex;
  font-size: ${metrics.cellFontSize}rem;
  justify-content: flex-end;
  width: 100%;
`

export const FirstListCell = styled(ListCell)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.pktBlueLight};
  justify-content: flex-start;
  text-decoration: underline;
  flex:1
`

export const ListRow = styled.div`
  align-items: center;
  display: flex;
  height: ${metrics.rowHeight}rem;
  justify-content: space-between;
  padding: 0 ${metrics.padding}rem;
  width: 100%;
  
  :nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
`
export const ListLabel = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  font-size: ${metrics.headerFontSize}rem;
  font-weight: ${metrics.fontWeight};
  /* width: 100%; */
  
  /* :first-child {
    justify-content: flex-start;
  } */
`

export const ListLabelCont = styled.div`
  display: flex;
  font-weight: 700;
  /*border-bottom: solid 1px ${({ theme }) => theme.colors.pktGreyLight};*/
  justify-content: space-between;
  padding: ${metrics.paddingHeader}rem;
  /* text-transform: capitalize; */
  width: 100%;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

export const TitleCont = styled.div`
  display: flex;
  font-weight: 700;
  /*border-bottom: solid 1px ${({ theme }) => theme.colors.pktGreyLight};*/
  justify-content: space-between;
  padding: ${metrics.padding}rem;
  /* text-transform: capitalize; */
  width: 100%;
  @media ${mqs.small} {
    flex-direction: column;
  }
`

export const TitleHeader = styled.span`
  margin-right: 10px;
  font-size: 1.8em;
  
`

export const LeftCont = styled.div`
  align-items: end;
  justify-content: start;
  display: flex;
`

export const RightCont = styled.div`
  align-items: end;
  justify-content: end;
  display: flex;
`

export const ClickableListLabelCont = styled(ListLabelCont)`
  /* &:hover {
    background: ${({ theme }) => theme.colors.pktGreyLight};
  } */
`

export const ListCont = styled.div`
  /*border-top: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  border-right: solid 1px ${({ theme }) => theme.colors.pktGreyLight};
  box-shadow: -2px 2px 2px ${({ theme }) => theme.colors.pktGreyLight};*/
  margin: ${metrics.margin}rem;
  ${({ rich }) => rich && css`max-width: 760px; margin: ${metrics.margin}rem auto`} 
`

export const BaseBt = styled(motion.div)`
width: 20px;
height: 20px;
border-radius: 3px;
margin-right: 10px;
background-color: ${({ theme }) => theme.colors.pktGrey};
display: flex;
justify-content: center;
align-items: center;
position: relative;
top: 0px;
cursor: pointer;
svg{
  width: 100%;
  height: 100%;
  position: relative;
  /* bottom: 1px; */
}
`

export const HashCont = styled.div`
  word-break: break-all;
  margin-top: 0.8rem;
  flex: 1;
`
export const Hash = styled.div`
  
`

const Unit = styled.span`
  font-weight: ${metrics.fontWeight};
`

const Decimal = styled.span`
  opacity: 0.5;
`

const UNITS = [
  ['PKT', 1, 'PKT'],
  ['mPKT', 1000, 'milli-PKT (thousandths)'],
  ['μPKT', 1000000, 'micro-PKT (millionths)'],
  ['nPKT', 1000000000, 'nano-PKT (billionths)']
]

const PktCont = styled.span`
  white-space: nowrap;
`

export const Pkt = ({ amt }) => {
  if (Number(amt) < 1) {
    return <PktCont>0<Decimal>.00</Decimal> <Unit>PKT</Unit></PktCont>
  }
  const fAmt = displayPKT(amt)
  let fa
  let u = UNITS[0]
  let i = 0
  do {
    fa = fAmt * UNITS[i][1]
    u = UNITS[i]
    i++
  } while (fa < 1 && u[0] !== 'nPKT')
  const str = commafy(parseFloat(fa).toFixed(2))
  const intDec = str.split('.')
  return <PktCont>{intDec[0]}<Decimal>.{intDec[1]}</Decimal> <Unit title={u[2]}>{u[0]}</Unit></PktCont>
}

Pkt.propTypes = {
  amt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
