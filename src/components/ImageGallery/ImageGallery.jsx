import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import s from './ImageGallery.module.css';
const API_KEY = '24718571-b89adef17fa712da498043d20';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends PureComponent {
  state = {
    images: [],
    error: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchImages !== this.props.searchImages ||
      prevProps.page !== this.props.page
    ) {
      if (prevProps.searchImages !== this.props.searchImages) {
        this.setState({ images: [] });
      }
      this.setState({ loading: true });
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.props.searchImages}&image_type=photo&orientation=horizontal&page=${this.props.page}&per_page=12`;
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error('Картинок по такому запросу не найдено')
          );
        })
        .then(data =>
          this.setState(prevState => ({
            images:
              prevState.images === []
                ? [data.hits]
                : [...prevState.images, ...data.hits],
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const { images, error, loading } = this.state;
    const { handleCurrentImage, children } = this.props;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        {images.length > 0 && (
          <>
            <ul className={s.list}>
              {images.map(({ webformatURL, tags, largeImageURL }, id) => (
                <ImageGalleryItem
                  imageUrl={webformatURL}
                  alt={tags}
                  key={id}
                  onClick={() => handleCurrentImage(largeImageURL, tags)}
                />
              ))}
            </ul>
            {children}
          </>
        )}
        {loading && <Loader />}
      </>
    );
  }
}

ImageGallery.protoTypes = {
  handleCurrentImage: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ImageGallery;
