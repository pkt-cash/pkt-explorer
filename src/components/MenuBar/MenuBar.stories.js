import React from 'react'
import { linkTo } from '@storybook/addon-links'

import MenuBar from './MenuBar'

export default {
  title: 'Top bar',
  component: MenuBar
}

export const MenuBarSt = () => <MenuBar showApp={linkTo('Button')} />
export const MenuBarRedSt = () => <MenuBar showApp={linkTo('Button')} hasAlert={120} />

MenuBarSt.story = {
  name: 'full MenuBar'
}
MenuBarRedSt.story = {
  name: 'full MenuBar - alert'
}
