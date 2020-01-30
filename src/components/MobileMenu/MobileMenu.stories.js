import React from 'react'
import { linkTo } from '@storybook/addon-links'

import MobileMenu, { MenuBt } from './MobileMenu'

export default {
  title: 'MobileMenu',
  component: MobileMenu
}

export const MenuBarSt = () => <MobileMenu showApp={linkTo('Button')} />
export const MenuBtStCl = () => <MenuBt />
export const MenuBtStOpen = () => <MenuBt isOpen={true} />

MenuBarSt.story = {
  name: 'MobileMenu'
}
MenuBtStCl.story = {
  name: 'Menu Button closed'
}
