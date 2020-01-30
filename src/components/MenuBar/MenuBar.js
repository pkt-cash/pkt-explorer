import React from 'react'
import Media from 'react-media'
import { MainWrapper, MenuCont } from '../CommonComps/CommonComps'
import MobileMenu from '../MobileMenu/MobileMenu'
import metrics from '../../theme/metrics'
import { Link } from 'react-router-dom'

const { mq } = metrics
// import PropTypes from 'prop-types'

const MenuBar = (props) => {
  return (
    <MenuCont>
      <Media query={`(max-width: ${mq.small}px)`} render={() =>
        (
          <MobileMenu />
        )}
      />
      <MainWrapper>
        <Link to='/'>
          PKT Explorer (beta)
        </Link>
      </MainWrapper>
    </MenuCont>
  )
}

// MenuBar.propTypes = {
// }

// MenuBar.defaultProps = {
// }

export default MenuBar
