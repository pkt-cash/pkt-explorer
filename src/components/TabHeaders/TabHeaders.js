import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TabsCont = styled.div`
  display: flex;
  margin: 0 0.5rem;
`
const TabsItem = styled.button`
  display: inline-block;
  border: none;
  border: 1px solid #e1e1e1;
  border-bottom: 0px solid;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #fff;
  color: #000 ;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* flex: 1; */
  width: 100%;
  border-radius: 5px 5px 0 0 ;
  white-space: nowrap;
`

const ItemCont = styled.div`
  border-bottom: 1px solid #e1e1e1;
  padding: 0 5px;
  flex: 1
`

const CurrTab = styled.div`
  display: inline-block;
  border: none;
  border-bottom: 1px solid #FFF;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.headerBackground};
  font-style: italic;
  font-weight: 700;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  /* cursor: pointer; */
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  flex: 1;
  border-radius: 5px 5px 0 0 ;
  white-space: nowrap;
`

const TabHeaders = ({ tabsData, cTab, action }) => {
  const [currTab, updateTab] = useState(cTab)
  function changeTab (newTab) {
    action(newTab)
    updateTab(newTab)
  }
  return (
    <TabsCont>
      {
        tabsData.map((tab, i) => {
          return parseInt(i) === parseInt(currTab)
            ? <CurrTab key={`tab-${i}`}>{tab.name}</CurrTab>
            : <ItemCont>
              <TabsItem key={`tab-${i}`}
                onClick={() => changeTab(i, tab.action)}
              >
                {tab.name}
              </TabsItem>
            </ItemCont>
        })
      }
    </TabsCont>
  )
}

TabHeaders.propTypes = {
  tabsData: PropTypes.array.isRequired,
  cTab: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired
}

export default TabHeaders
