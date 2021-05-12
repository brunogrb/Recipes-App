import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import propTypes from 'prop-types';
import {
  toggleFavorite,
  doesFavoriteExists,
} from '../../services/localstorage';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

export default function FoodThumb({ detailed, route, id }) {
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  let detailedImg;
  let detailedTitle;
  let category;

  if (route === 'comidas') {
    detailedImg = 'strMealThumb';
    detailedTitle = 'strMeal';
    category = 'strCategory';
  } else {
    detailedImg = 'strDrinkThumb';
    detailedTitle = 'strDrink';
    category = 'strAlcoholic';
  }

  const req = {
    id,
    type: route === 'comidas' ? 'comida' : 'bebida',
    area: route === 'comidas' ? detailed[0].strArea : '',
    category: detailed[0].strCategory,
    alcoholicOrNot: route === 'comidas' ? '' : detailed[0].strAlcoholic,
    name: detailed[0][detailedTitle],
    image: detailed[0][detailedImg],
  };

  useEffect(() => {
    setIsFavorite(doesFavoriteExists(id));
  }, [id, isFavorite]);

  const mds = 1000;

  const copyTo = () => {
    copy(`http://localhost:3000/${route}/${id}`);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, mds);
  };

  return (
    <div>
      <img
        className="recipe-thumbnail"
        data-testid="recipe-photo"
        alt=""
        src={ detailed[0][detailedImg] }
      />
      <div className="thumb-title-wrapper">
        <div className="thumb-title">
          <h2 data-testid="recipe-title">{detailed[0][detailedTitle]}</h2>
          <h4 data-testid="recipe-category">{detailed[0][category]}</h4>
        </div>
        <div className="thumb-icons">
          <input
            type="image"
            src={ shareIcon }
            alt=""
            data-testid="share-btn"
            onClick={ copyTo }
            className="f-icon"
          />
          <input
            type="image"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
            data-testid="favorite-btn"
            onClick={ () => {
              setIsFavorite(!isFavorite);
              toggleFavorite(req);
            } }
            className="f-icon"
          />
        </div>
      </div>

      { copiedAlert && <p>Link copiado!</p> }
    </div>
  );
}

FoodThumb.propTypes = {
  detailed: propTypes.arrayOf(propTypes.object).isRequired,
  route: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};
