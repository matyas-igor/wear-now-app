import * as React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Forecast from './pages/Forecast'
import Home from './pages/Home'
import { theme } from './helpers/theme'
import NavBar from './components/NavBar'
import Normalize from './components/Normalize'
import { Flex } from 'rebass/styled-components'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <Router>
        <Flex height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start">
          <NavBar />
          <Switch>
            <Route path="/forecast">
              <Forecast />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Flex>
      </Router>
    </ThemeProvider>
  )
}

export default App
