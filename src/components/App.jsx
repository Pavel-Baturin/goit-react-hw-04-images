import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

class App extends Component {
  state = {
    searchImages: '',
    searchPage: 1,
    currentOpenImage: null,
    currentTags: null,
    showModal: false,
  };

  handleFormSubmit = searchImages => {
    this.setState({
      searchImages,
      searchPage: 1,
    });
  };

  onClickButtonMore = () => {
    this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
  };

  handleCurrentImage = (bigImage, tags) => {
    this.setState({
      currentOpenImage: bigImage,
      showModal: true,
      currentTags: tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      searchPage,
      searchImages,
      showModal,
      currentTags,
      currentOpenImage,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          page={searchPage}
          searchImages={searchImages}
          handleCurrentImage={this.handleCurrentImage}
        >
          <Button onClickMore={this.onClickButtonMore} />
        </ImageGallery>
        {showModal && (
          <Modal
            currentImage={currentOpenImage}
            currentTags={currentTags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
