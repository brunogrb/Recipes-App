import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import FoodThumb from '../../components/FoodThumb';
import TodoList from './TodoList';
import { addRecipeToLocalStorage } from '../../services/localstorage';

import {
  fetchFoodById,
  fetchFoodByName,
} from '../../redux/actions/foodActions';
import {
  fetchCocktailByName,
  fetchCocktailById,
} from '../../redux/actions/drinkActions';

function EmProgesso({
  meals,
  drinks,
  fetchFoodId,
  fetchCocktails,
  fetchDrinkID,
  fetchMeals,
}) {
  const { id } = useParams();
  const history = useHistory();

  let route = 'bebidas';
  if (history.location.pathname.match(/comidas/)) {
    route = 'comidas';
  }

  useEffect(() => {
    if (route === 'comidas') {
      fetchFoodId(id);
      fetchCocktails('');
    } else {
      fetchDrinkID(id);
      fetchMeals('');
    }
  }, []);

  const [isEnded, setisEnded] = useState(false);
  if (!meals[0] || !drinks[0]) return <p>Carregando...</p>;

  const ingredients = Object.entries(
    route === 'comidas' ? meals[0] : drinks[0],
  ).filter((element) => {
    if (element[0].match(/strIngredient/) && element[1]) {
      return true;
    }
    return false;
  });

  function addToLocalStorageAndChangeRoute(item) {
    addRecipeToLocalStorage(item, route);
    history.push('/receitas-feitas');
  }

  return (
    <div>
      Em progresso:
      <FoodThumb
        detailed={ route === 'comidas' ? meals : drinks }
        route={ route }
        id={ id }
      />
      <TodoList
        ingredients={ ingredients }
        setisEnded={ setisEnded }
        route={ route }
        id={ id }
      />
      <p data-testid="instructions">
        {route === 'comidas'
          ? meals[0].strInstructions
          : drinks[0].strInstructions}
      </p>
      {isEnded && <p>terminou</p>}
      <button
        disabled={ !isEnded }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => addToLocalStorageAndChangeRoute(
          route === 'comidas' ? meals : drinks,
        ) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

EmProgesso.propTypes = {
  meals: PropTypes.string.isRequired,
  drinks: PropTypes.string.isRequired,
  fetchFoodId: PropTypes.func.isRequired,
  fetchCocktails: PropTypes.func.isRequired,
  fetchDrinkID: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(EmProgesso);
