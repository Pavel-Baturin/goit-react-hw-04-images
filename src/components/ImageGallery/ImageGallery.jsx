import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import s from './ImageGallery.module.css';
const API_KEY = '24718571-b89adef17fa712da498043d20';
const BASE_URL = 'https://pixabay.com/api/';

function ImageGallery({ searchImages, page, handleCurrentImage, children }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchImages}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  useEffect(() => {
    if (!searchImages) {
      return;
    }
    setLoading(true);
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
        setImages(images =>
          page === 1 ? [...data.hits] : [...images, ...data.hits]
        )
      )
      .catch(error => setError(error))
      .finally(setLoading(false));
  }, [searchImages, page, url]);

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
                onClick={() => handleCurrentImage(largeImageURL)}
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

ImageGallery.protoTypes = {
  handleCurrentImage: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  page: PropTypes.number.isRequired,
  searchImages: PropTypes.string.isRequired,
};

export default ImageGallery;
