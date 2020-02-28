import React from 'react'
import GenBt from './GenBt'
import { action } from '@storybook/addon-actions'
// import * as Cp from 'clipboard'

export default {
  title: 'GenBt',
  component: GenBt
}

export const CopyBt = () => <GenBt isOpen={true} icn='copy' onClick={action('dd')}/>

CopyBt.story = {
  name: 'CopyBt'
}
