import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import GlobalStyles from '../src/App.css.js'
addDecorator(storyFn => <><GlobalStyles />
  {storyFn()}
</>)
configure(require.context('../src/components', true, /\.stories\.js$/), module)
