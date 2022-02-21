import React, { Component } from 'react';
import { ReactComponent as Search } from '../Icons/search.svg';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInputChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Введите запрос в поле поиска!');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <Search />
          </button>

          <input
            className={s.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
