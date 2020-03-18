import React from 'react'
import OmniboxMobile from './OmniboxMobile'
import { withKnobs, boolean } from '@storybook/addon-knobs'

export default {
  title: 'OmniboxMobile',
  component: OmniboxMobile,
  decorators: [withKnobs]

}

export const OmniboxMobileSt = () => <OmniboxMobile isOpen={boolean('isOpen', false)}/>

OmniboxMobileSt.story = {
  name: 'OmniboxMobile is open'
}
