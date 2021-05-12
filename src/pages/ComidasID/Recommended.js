import React from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Recommended({ suggestions }) {
  const { route } = useParams();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const five = 5;

  let strImgPath;
  let strTitle;

  if (route === 'comidas') {
    strImgPath = 'strDrinkThumb';
    strTitle = 'strDrink';
  } else {
    strImgPath = 'strMealThumb';
    strTitle = 'strMeal';
  }

  return (
    <div className="slider">
      <h2> Recomendações </h2>
      <Slider { ...settings }>
        {suggestions.map((elem, index) => {
          if (index > five) return null;
          return (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <img className="slide-img" alt="" src={ elem[strImgPath] } />
              <p data-testid={ `${index}-recomendation-title` }>{ elem[strTitle] }</p>
            </div>);
        })}
      </Slider>
    </div>
  );
}

Recommended.propTypes = {
  suggestions: propTypes.arrayOf(propTypes.object).isRequired,
};
