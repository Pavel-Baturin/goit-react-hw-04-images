import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

function App() {
  const [searchImages, setSearchImages] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [currentOpenImage, setCurrentOpenImage] = useState('');

  const handleFormSubmit = searchImages => {
    setSearchImages(searchImages);
    setSearchPage(1);
  };

  const onClickButtonMore = () => {
    setSearchPage(prevState => prevState + 1);
  };

  const handleCurrentImage = currentOpenImage => {
    toggleModal();
    setCurrentOpenImage(currentOpenImage);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        page={searchPage}
        searchImages={searchImages}
        handleCurrentImage={handleCurrentImage}
      >
        <Button onClickMore={onClickButtonMore} />
      </ImageGallery>
      {showModal && (
        <Modal currentImage={currentOpenImage} onClose={toggleModal} />
      )}
    </>
  );
}

export default App;
