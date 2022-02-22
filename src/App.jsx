import React, { Component } from 'react';
import Section from "components/Section/Section";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from 'components/ImageGallery/ImageGallery'

class App extends Component {
  state = {
    searchValue: ''
  }
  
  handleInputSubmit = (searchValue) => {
    this.setState({searchValue})
  }
  
  render() {
    return (
      <>
        <Section>
          <Searchbar onSubmit={this.handleInputSubmit} />
        </Section>

        <Section>
          <ImageGallery searchValue={this.state.searchValue} />
        </Section>
      </> 
    )
  }
};

export default App;