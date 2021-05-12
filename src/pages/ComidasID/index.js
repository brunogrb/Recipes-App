import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Recommended from './Recommended';
import FoodThumb from '../../components/FoodThumb';
import {
  fetchFoodById,
  fetchFoodByName,
} from '../../redux/actions/foodActions';
import {
  fetchCocktailByName,
  fetchCocktailById,
} from '../../redux/actions/drinkActions';
import './styles.css';

function ComidasID({
  meals,
  drinks,
  fetchFoodId,
  fetchCocktails,
  fetchDrinkID,
  fetchMeals,
}) {
  const [winSize, setWinSize] = useState(document.documentElement.clientWidth);
  const updateSize = () => {
    setWinSize(document.documentElement.clientWidth);
  };
  window.addEventListener('resize', updateSize);

  const { route, id } = useParams();

  let startBtnText = 'Iniciar Receita';
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const nine = 9;
  const twoOne = 21;
  const size = 2;
  const multiplyer = 1.777777777778;

  let detailed;
  let suggestions;
  let video;
  let indexDiff;
  let keyName;

  useEffect(() => {
    if (route === 'comidas') {
      fetchFoodId(id);
      fetchCocktails('');
    } else {
      fetchDrinkID(id);
      fetchMeals('');
    }
  }, []);

  if (!meals || !drinks || !meals[0] || !drinks[0]) return <p>Carregando...</p>;

  if (route === 'comidas') {
    detailed = meals;
    video = true;
    suggestions = drinks;
    indexDiff = nine;
    keyName = 'meals';
  } else {
    detailed = drinks;
    video = false;
    suggestions = meals;
    indexDiff = twoOne;
    keyName = 'cocktails';
  }
  if (inProgress
    && Object.keys(inProgress[keyName]).includes(id)) startBtnText = 'Continuar Receita';

  return (
    <div>
      <FoodThumb detailed={ detailed } route={ route } id={ id } />
      <div className="ala">
        <ul>
          Ingredientes:
          {Object.keys(detailed[0]).map((key, index) => {
            const ingredientIndex = key.match(/(\d+)/);
            if (detailed[0][key] && key.includes('strIngredient')) {
              const measure = `strMeasure${ingredientIndex[0]}`;
              return (
                <li
                  key={ `measure-${index}` }
                  data-testid={ `${
                    index - indexDiff
                  }-ingredient-name-and-measure` }
                >
                  {`${detailed[0][key]} - ${detailed[0][measure]}`}
                </li>
              );
            }
            return null;
          })}
        </ul>
        <p data-testid="instructions">{detailed[0].strInstructions}</p>

        {video && (
          <ReactPlayer
            className="video"
            height={ `${winSize / size}px` }
            width={ `${(winSize / size) * multiplyer}px` }
            data-testid="video"
            url={ detailed[0].strYoutube }
          />
        )}

        <Recommended suggestions={ suggestions } />
        <p>
          <Link
            to={ `/${route}/${id}/in-progress` }
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            { startBtnText }
          </Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
  drinks: state.cocktailsDrinks.cocktails,
});

const mapDispatchToProps = {
  fetchFoodId: fetchFoodById,
  fetchCocktails: fetchCocktailByName,
  fetchDrinkID: fetchCocktailById,
  fetchMeals: fetchFoodByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComidasID);

ComidasID.propTypes = {
  fetchFoodId: propTypes.func.isRequired,
  fetchCocktails: propTypes.func.isRequired,
  fetchDrinkID: propTypes.func.isRequired,
  fetchMeals: propTypes.func.isRequired,
  meals: propTypes.arrayOf(propTypes.object).isRequired,
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
};
