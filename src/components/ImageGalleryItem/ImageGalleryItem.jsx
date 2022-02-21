import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ imageUrl, alt, onClick }) {
  return (
    <li className={s.item} onClick={onClick}>
      <img className={s.image} src={imageUrl} alt={alt} />
    </li>
  );
}

ImageGalleryItem.protoTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
