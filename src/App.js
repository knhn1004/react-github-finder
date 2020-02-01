import React, {Component, Fragment, lazy, Suspense} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'

import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
// import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import Spinner from './components/layout/Spinner'
// import About from './components/pages/About'
const About = lazy(() => import('./components/pages/About'))
const User = lazy(() => import('./components/users/User'))

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  }

  // Search github users
  searchUsers = async text => {
    this.setState({loading: true})
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )
    this.setState({loading: false, users: res.data.items})
  }

  // Get single Github user
  getUser = async username => {
    this.setState({loading: true})
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )
    this.setState({loading: false, user: res.data})
  }

  // Get user's repos
  getUserRepos = async username => {
    this.setState({loading: true})
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    )
    this.setState({loading: false, repos: res.data})
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({users: [], loading: false})
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setTimeout(() => {
      this.setState({alert: null})
    }, 3000)
  }

  render() {
    const {users, loading, user, repos} = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
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
                    <User
                      {...props}
                      getUser={this.getUser}
                      user={user}
                      getUserRepos={this.getUserRepos}
		      repos={repos}
                    />
                  </Suspense>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
