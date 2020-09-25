import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Flex } from 'rebass/styled-components'
import { ThemeProvider } from 'styled-components'
import Forecast from './pages/Forecast/Forecast'
import Home from './pages/Home/Home'
import { theme } from './helpers/theme'
import NavHeader from './components/NavHeader'
import NavFooter from './components/NavFooter'
import Normalize from './components/Normalize'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <Router>
        <Flex minHeight="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start">
          <NavHeader />
          <Flex
            sx={{ overflow: 'auto' }}
            flexGrow={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Switch>
              <Route path="/forecast">
                <Forecast />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Flex>
          <NavFooter />
        </Flex>
      </Router>
    </ThemeProvider>
  )
}

export default App
