import React, { Component } from 'react';
import fetchImages from "api/api";
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ButtonLoadMore from 'components/Button/Button';
import { TailSpin } from 'react-loader-spinner'
import s from "components/ImageGallery/ImageGallery.module.css";

class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
  }
  

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;

    if (nextSearchValue !== prevSearchValue) {
      
      this.setState({ loading: true, images: [], page: 1});

        try {
          const images = await fetchImages(nextSearchValue, 1);
          if (images.length === 0) {
            throw new Error(`изображение по запросу "${nextSearchValue}" не найдено`);
          }
          this.setState((prevState => ({ images, error: null, page: prevState.page += 1 })));
        } catch (error) {
          this.setState({error, images: []})
        } finally {
          this.setState({ loading: false });
      }
    }
  }


  async fetchMoreImg() {
    try {
          const images = await fetchImages(this.props.searchValue, this.state.page);

          const newImages = this.state.images.concat(images);

          this.setState(prevState => ({page: prevState.page += 1, images: newImages, error: null}))
        } catch (error) {
         this.setState({error, images: []})
        } finally {
          this.setState({ loading: false });
    }
  }

  handleClick = () => {
    this.fetchMoreImg();
  }

  render() {
    const { images, loading } = this.state;
  
    return (
      <>
        {images.length > 0
          &&
          <>
            <ul className={s.ImageGallery}>
              <ImageGalleryItem images={images} />
            </ul>
            <div className={s.container}>
              <ButtonLoadMore onClick={this.handleClick} />
            </div>
          </>
        }

        {loading &&
          <div className={s.container}>
            <TailSpin
            height="50"
            width="50"
            color='blue'
            ariaLabel='loading'
            />
          </div>
        }
        

        {this.state.error && <p>{this.state.error.message}</p>}
      </>
    )
  }
}

export default ImageGallery;

        