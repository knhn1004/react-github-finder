import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
import './App.css'

import Navbar from './components/layout/Navbar'
// import User from './components/users/User'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Alert from './components/layout/Alert'
import Spinner from './components/layout/Spinner'
// import About from './components/pages/About'
const About = lazy(() => import('./components/pages/About'))
const User = lazy(() => import('./components/users/User'))

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/about"
                  render={() => (
                    <Suspense fallback={<Spinner />}>
                      <About />
                    </Suspense>
                  )}
                />
                <Route
                  exact
                  path="/user/:login"
                  render={props => (
                    <Suspense fallback={<Spinner />}>
                      <User {...props} />
                    </Suspense>
                  )}
                />
		<Route exact path="/404" component={NotFound} />
		<Redirect to="/404" />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App
