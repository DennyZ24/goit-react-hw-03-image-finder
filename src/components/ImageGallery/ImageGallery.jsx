import React, { Component } from 'react';
// import axios from "axios";
import fetchImages from "api/api";

class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  }

   async componentDidUpdate(prevProps, prevState) {
    const nextSearchValue = this.props.searchValue;
    const prevSearchValue = prevProps.searchValue;

     if (nextSearchValue !== prevSearchValue) {
      this.setState({ loading: true });
       
      try {
        const images = await fetchImages(nextSearchValue, 1);
        
        this.setState({ images })
        
      } catch (error) {
        this.setState({error})
      } finally{this.setState({ loading: false });}
    }
  }

  render() {
    const { images, loading } = this.state;
    
    return (
      <>
        {loading && <p>loading ...</p>}
        {images.length > 0
          &&
          <ul className="gallery">
            {images.map(image =>
            <li>
              <img src={image.webformatURL} alt={image.tags} />
            </li>)}
          </ul>   
        }
      </>
    )
  }
}

export default ImageGallery;

        