import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import './styles.css';

export default function Header({
  title,
  searchButtonExists = false,
  setIsSearchBarVisible,
}) {
  const [state, setstate] = useState(false);
  return (
    <header data-testid="header" className="header">
      <Link src={ profileIcon } to="/perfil" data-testid="profile-top-btn">
        <img alt="" src={ profileIcon } />
      </Link>
      <h2 data-testid="page-title">{title}</h2>
      {searchButtonExists && (
        <button
          src={ searchIcon }
          // to="/profile"
          type="button"
          className="b-search"
          onClick={ () => {
            setstate(!state);
            setIsSearchBarVisible(!state);
          } }
        >
          <img alt="" src={ searchIcon } data-testid="search-top-btn" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  searchButtonExists: PropTypes.bool.isRequired,
  setIsSearchBarVisible: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
