import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import metrics from '../../theme/metrics'
import { MdSearch } from 'react-icons/md'
import useBox from '../../hooks/useBox'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

const OmniboxMobileCont = styled(motion.div)`
  display: flex;
  justify-content: center;
  
  background-color: ${({ theme }) => theme.colors.pktGreyLight};
  overflow: hidden;
`

const Wrapper = styled.div`
  padding: ${metrics.margin}rem;
  display: flex;
  justify-content: center;
  flex: 1

`

const drawerVar = {
  open: {
    height: 'auto'
  },
  closed: {
    height: 0
  }
}

export const OmniBt = ({ act }) => <BtCont onClick={act}>
  <MdSearch/>
</BtCont>

const BtCont = styled.button`
  width: 30px;
  height: 30px;
  background-color: red;
  display: inline-block;
  border: none;
  /* padding: 1rem 2rem; */
  margin: 0;
  text-decoration: none;
  background: #006485;
  color: #ffffff;
  /* font-family: sans-serif; */
  /* font-size: 1rem; */
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  margin-right: 20px;
  -moz-appearance: none;
  position: relative;
  border-radius: 3px;
  svg{
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
  }
`

const SearchIcon = styled(MdSearch)`
  background-color: ${({ theme }) => theme.colors.pktGreyLight};
  color: ${({ theme }) => theme.colors.pktBlueDark};
  cursor: pointer;
  font-size: ${metrics.ommiboxFontSize}rem;
  border-radius: 0 5px 5px 0;
  box-shadow: 0 ${metrics.omniboxBoxShadow}px ${metrics.omniboxBoxShadow}px ${({ theme }) => theme.colors.pktBlueDarker};
  height: ${metrics.omniboxHeight}rem;
  width: ${metrics.omniboxHeight}rem;
`

const InputHavingPlacholder = styled.input`
  border: none;
  box-shadow: 0 ${metrics.omniboxBoxShadow}px ${metrics.omniboxBoxShadow}px ${({ theme }) => theme.colors.pktBlueDarker};
  color: ${({ theme }) => theme.colors.pktBlueDarker};
  padding: ${metrics.omniboxPadding}rem;
  width: 100%;
  height: ${metrics.omniboxHeight}rem;
  max-width: 100%;
`

const OmniboxMobile = ({ placeholder, isOpen }) => {
  const hist = useHistory()
  console.log('isOpen', isOpen)
  const { inputs, handleInputChange, handleSubmit } = useBox(hist)
  function onEnterPressed (evt) {
    if (evt.key === 'Enter') {
      return handleSubmit()
    }
  }
  return (<OmniboxMobileCont
    variants={drawerVar}
    animate={isOpen ? 'open' : 'closed'}
    initial='closed'
    transition={{ duration: 0.1 }}
  >
    <Wrapper>
      <InputHavingPlacholder placeholder={placeholder} onChange={ handleInputChange } value={inputs.omni} onKeyDown={onEnterPressed}/>
      <SearchIcon onClick={handleSubmit}/>

    </Wrapper>
  </OmniboxMobileCont>)
}

OmniboxMobile.propTypes = {
  placeholder: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
}

OmniboxMobile.defaultProps = {
  placeholder: 'Search for block, transaction or address.'
}

export default OmniboxMobile
