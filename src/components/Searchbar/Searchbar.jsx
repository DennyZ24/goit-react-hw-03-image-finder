import React, {Component} from 'react';
import { FaSearch } from 'react-icons/fa';



class Searchbar extends Component {
  state = {
    searchValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchValue)

    this.setState({searchValue:''})
  }

  handleInputeChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({[name]: value})
  }

  render() {
    return (
      <header className={'s.SearchBar'}>
       <form className={'s.SearchForm'} onSubmit={this.handleSubmit}>
          <button type="submit" className={'s.Button'}>
            <FaSearch/>
          </button>

          <input
            name='searchValue'
            className ={'s.Input'}
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
