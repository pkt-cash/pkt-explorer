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

export const MenuCont = styled.div`
  /* text-align: center; */
  /* display: flex;
  align-items: flex-start;
  justify-content: center; */
  padding-left: 60px;
  height: ${metrics.menuHeight}px;
  background-color: ${({ theme }) => theme.colors.pktBlue};
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

export const TitleHeader = styled.div`
  margin-right: 10px;
  font-size: 1.8em;
  margin-bottom: -2px; /* TODO(cjd): This is a mess */
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
  white-space: nowrap;
  min-width:0;
  display: flex; 
`
export const Hash = styled.div`
overflow: hidden;
text-overflow: ellipsis;
margin-right: 10px;
`


const Unit = styled.span`
  font-weight: ${metrics.fontWeight};
`

const Decimal = styled.span`
  opacity: 0.5;
`

export const Pkt = ({ amt }) => {
  const str = commafy(parseFloat(displayPKT(amt)).toFixed(2));
  const intDec = str.split('.');
  return <>{intDec[0]}<Decimal>.{intDec[1]}</Decimal> <Unit>PKT</Unit></>;
}

Pkt.propTypes = {
  amt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
