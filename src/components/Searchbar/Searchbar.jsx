import { useState } from 'react';
import { ReactComponent as Search } from '../Icons/search.svg';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleInputChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      alert('Введите запрос в поле поиска!');
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
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
          value={search}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
