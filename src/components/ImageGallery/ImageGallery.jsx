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
      
      this.setState({ loading: true, images: []});

        try {
          const images = await fetchImages(nextSearchValue, 1);
          if (images.length === 0) {
            throw new Error(`изображение по запросу "${nextSearchValue}" не найдено`);
          }
          this.setState({ images, error: null })
        } catch (error) {
          this.setState({error, images: []})
        } finally {
          this.setState({ loading: false });
      }
    }

    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });

        try {
          const images = await fetchImages(nextSearchValue, this.state.page);

          const newImages = this.state.images.concat(images);

          this.setState({ images: newImages, error: null })
        } catch (error) {
          this.setState({error, images: []})
        } finally {
          this.setState({ loading: false });
      }
    }

    
  }

  handleClick = () => {
    this.setState((prevState => {
      const newPage = prevState.page += 1;
      return {page: newPage}
    }))
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

        {images.length > 0 && loading !== 'true' ?
          <div className={s.container}>
            <ButtonLoadMore onClick={this.handleClick} />
          </div> : null}

        {this.state.error && <p>{this.state.error.message}</p>}
      </>
    )
  }
}

export default ImageGallery;

        