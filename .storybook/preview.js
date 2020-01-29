import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import GlobalStyles from '../src/App.css.js'
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme/theme'
addDecorator(storyFn => <><GlobalStyles />
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
</>)
configure(require.context('../src/components', true, /\.stories\.js$/), module)
