import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

const Navbar = ({icon, title}) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github',
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default Navbar
