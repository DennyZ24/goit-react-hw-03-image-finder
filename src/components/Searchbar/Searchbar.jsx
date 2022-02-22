import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchValue)
  }

  handleInputeChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({[name]: value})
  }

  render() {
    return (
      <header className="searchbar">
       <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            name='searchValue'
            className ="input"
            type="text"
            value={this.state.searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputeChange}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar;