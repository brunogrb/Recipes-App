import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import './styles.css';
import Header from '../../components/Header';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { removeFavorite } from '../../services/localstorage';

function ReceitasFavoritas() {
  const [filters, setFilter] = useState('');
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const mds = 1000;

  const copyTo = (route, id) => {
    const elem = `http://localhost:3000/${route}/${id}`;
    copy(elem);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, mds);
  };

  function renderFilters() {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilter('');
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setFilter('comida');
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilter('bebida');
          } }
        >
          Drinks
        </button>
      </div>
    );
  }

  function renderFavoriteReceipes() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorites) return <p>LocalStorage vazio!</p>;
    const renderFav = favorites.filter((favorite) => favorite.type.includes(filters));
    return renderFav.map((favorite, index) => (
      <div key={ index }>
        {favorite.type === 'comida' ? (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/comidas/${favorite.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favorite.image }
                alt={ favorite.name }
              />
              <div data-testid={ `${index}-horizontal-top-text` }>
                { `${favorite.area} - ${favorite.category}` }
              </div>
              <div data-testid={ `${index}-horizontal-name` } className="df-name">
                { favorite.name }
              </div>
            </Link>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('comidas', favorite.id);
                } }
                className="f-icon"
              />
              <input
                type="image"
                src={ blackHeartIcon }
                alt=""
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => {
                  removeFavorite(favorite);
                  setIsFavorite(!isFavorite);
                } }
                className="f-icon"
              />
            </div>
          </div>
        ) : (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/bebidas/${favorite.id}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favorite.image }
                alt={ favorite.name }
              />
              <div data-testid={ `${index}-horizontal-top-text` }>
                { favorite.alcoholicOrNot }
              </div>
              <div data-testid={ `${index}-horizontal-name` } className="df-name">
                { favorite.name }
              </div>
            </Link>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('bebidas', favorite.id);
                } }
                className="f-icon"
              />
              <input
                type="image"
                src={ blackHeartIcon }
                alt=""
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => {
                  removeFavorite(favorite);
                  setIsFavorite(!isFavorite);
                } }
                className="f-icon"
              />
            </div>
          </div>
        )}
        { copiedAlert && <p>Link copiado!</p> }
      </div>
    ));
  }

  useEffect(() => {
    renderFavoriteReceipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" searchButtonExists={ false } />
      { renderFilters() }
      { renderFavoriteReceipes() }
    </div>
  );
}

export default ReceitasFavoritas;
