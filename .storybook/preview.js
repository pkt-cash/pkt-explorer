import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import GlobalStyles from '../src/App.css.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme/theme'
addDecorator(storyFn => <><GlobalStyles />
  <Router>
    <ThemeProvider theme={theme}>
      {storyFn()}
    </ThemeProvider>
  </Router>
</>)
configure(require.context('../src/components', true, /\.stories\.js$/), module)
