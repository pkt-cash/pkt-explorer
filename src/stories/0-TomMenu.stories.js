import React from 'react'
import { linkTo } from '@storybook/addon-links'

import MenuBar from '../components/MenuBar/MenuBar'

export default {
  title: 'Top bar',
  component: MenuBar
}

export const MenuBarSt = () => <MenuBar showApp={linkTo('Button')} />

MenuBarSt.story = {
  name: 'full MenuBar'
}
