import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import metrics from '../../theme/metrics'
import { MdSearch } from 'react-icons/md'
import useBox from '../../hooks/useBox'
import { useHistory } from 'react-router-dom'
import { fetchJson } from '../../utils'
import endpoints from '../../utils/endpoints'
const { addrMetaApi } = endpoints
const OmniboxCont = styled.div`
  display: flex;
  justify-content: center;
  margin: ${metrics.margin}rem;
  height: ${metrics.omniboxHeight}rem;
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
  width: 300px;
  max-width: 100%;
`

const Omnibox = ({ placeholder }) => {
  const hist = useHistory()
  const omniNavigate = (input) => {
    if (isNaN(parseInt(input))) {
      fetchJson(`${addrMetaApi}/${input}`)
        .then((json) => {
          if (json.error) {
            console.log(('this is not an adress'))
            console.log(json)
          } else hist.push(`/address/${input}`)
        })
    } else {
      console.log('this is a number', input)
    }
  }
  const { inputs, handleInputChange, handleSubmit } = useBox(() => omniNavigate(inputs.omni))
  function onEnterPressed (evt) {
    if (evt.key === 'Enter') {
      return handleSubmit()
    }
  }
  return (<OmniboxCont>
    <InputHavingPlacholder placeholder={placeholder} onChange={ handleInputChange } value={inputs.omni} onKeyDown={onEnterPressed}/>
    <SearchIcon onClick={handleSubmit}/>
  </OmniboxCont>)
}

Omnibox.propTypes = {
  placeholder: PropTypes.string.isRequired
}

Omnibox.defaultProps = {
  placeholder: 'Search for block, transaction or address.'
}

export default Omnibox
