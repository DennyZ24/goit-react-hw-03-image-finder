import React, { Component } from 'react';
import Section from "components/Section/Section";
import SearchBar from "components/SearchBar/SearchBar";
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchValue: ''
  }
  
  handleInputSubmit = (searchValue) => {
    this.setState({searchValue: searchValue.toLowerCase()})
  }
  
  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleInputSubmit} />
        
        <Section>
          <ImageGallery searchValue={this.state.searchValue} />
        </Section>
      </> 
    )
  }
};

export default App;