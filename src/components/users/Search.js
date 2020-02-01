import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    text: '',
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light')
    } else {
      this.props.searchUsers(this.state.text)
      this.setState({text: ''})
    }
  }

  render() {
    const {showClear, clearUsers} = this.props
    const clearButton = showClear ? (
      <button className="btn btn-light btn-block" onClick={clearUsers}>
        Clear
      </button>
    ) : null

    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            className="btn btn-dark btn-block"
            type="submit"
            value="Search"
          />
        </form>
        {clearButton}
      </div>
    )
  }
}

export default Search