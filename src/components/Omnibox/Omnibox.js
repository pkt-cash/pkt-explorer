import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import metrics from '../theme/metrics'
import { MdSearch } from 'react-icons/md'

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
  border-radius: 5px 0 0 5px;
  box-shadow: 0 ${metrics.omniboxBoxShadow}px ${metrics.omniboxBoxShadow}px ${({ theme }) => theme.colors.pktBlueDarker};
  height: ${metrics.omniboxHeight}rem;
  width: ${metrics.omniboxHeight}rem;
`

const InputHavingPlacholder = styled.input`
  border: none;
  box-shadow: 0 ${metrics.omniboxBoxShadow}px ${metrics.omniboxBoxShadow}px ${({ theme }) => theme.colors.pktBlueDarker};
  color: ${({ theme }) => theme.colors.pktBlueDarker};
  padding: ${metrics.omniboxPadding}rem;
  width: 80vw;
`

const OmniboxInput = ({ placeholder }) => <InputHavingPlacholder placeholder={placeholder}>
</InputHavingPlacholder>

const Omnibox = ({ placeholder }) => {
  return (<OmniboxCont>
    <SearchIcon />
    <OmniboxInput placeholder={placeholder} />
  </OmniboxCont>)
}

OmniboxInput.propTypes = {
  placeholder: PropTypes.string.isRequired
}

Omnibox.propTypes = {
  placeholder: PropTypes.string.isRequired
}

Omnibox.defaultProps = {
  placeholder: 'Search for block, transaction or address.'
}

export default Omnibox
