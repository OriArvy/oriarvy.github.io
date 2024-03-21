import React, { useState } from 'react';
import classes from './SearchBar.module.css'
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className={classes.searchInput}
        placeholder="Enter Spotify username"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={classes.searchIcon} type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;