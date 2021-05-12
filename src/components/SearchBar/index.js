import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.css';
import {
  fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  addFood,
} from '../../redux/actions/foodActions';
import {
  fetchCocktailByIngredient,
  fetchCocktailByName,
  fetchCocktailByFirstLetter,
  addCocktail,
} from '../../redux/actions/drinkActions';

function SearchBar({ foodType, fi, fl, ci, cl, addDrinks, addMeals }) {
  const [type, setType] = useState('ingredient');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
  }, [type, searchTerm]);

  const history = useHistory();

  const handleMealSearch = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const jsonRes = await res.json();
    addMeals(jsonRes);
    if (jsonRes.meals.length === 1) {
      history.push(`/comidas/${jsonRes.meals[0].idMeal}`);
    }
  };

  const handleDrinkSearch = async () => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const jsonRes = await res.json();
    addDrinks(jsonRes);
    if (jsonRes.drinks.length === 1) {
      history.push(`/bebidas/${jsonRes.drinks[0].idDrink}`);
    }
  };

  const handleStore = () => {
    if (foodType === 'comidas') {
      switch (type) {
      case 'ingredient':
        fi(searchTerm);
        break;
      case 'name':
        handleMealSearch();
        break;
      case 'primLetra':
        if (searchTerm.length > 1) {
          console.log(searchTerm.length);
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        fl(searchTerm);
        break;

      default:
        console.log('eu nunca devo ser printado :D');
        break;
      }
    } else {
      switch (type) {
      case 'ingredient':
        ci(searchTerm);
        break;
      case 'name':
        handleDrinkSearch();
        break;
      case 'primLetra':
        if (searchTerm.length > 1) {
          console.log(searchTerm.length);
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        cl(searchTerm);
        break;

      default:
        console.log('eu nunca devo ser printado :D');
        break;
      }
    }
  };

  return (
    <div>
      <form className="search-form-wrapper">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setSearchTerm(e.currentTarget.value) }
          className="form-input"
        />
        <div onChange={ (e) => setType(e.target.value) } className="search-wrap-radio">
          <label htmlFor="ing" className="search-label">
            <input
              type="radio"
              id="ing"
              name="type"
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="nam" className="search-label">
            <input
              type="radio"
              id="nam"
              name="type"
              value="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="pletra" className="search-label">
            <input
              type="radio"
              id="pletra"
              name="type"
              value="primLetra"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleStore }
          className="form-button"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  ci: PropTypes.func.isRequired,
  cl: PropTypes.func.isRequired,
  fi: PropTypes.func.isRequired,
  fl: PropTypes.func.isRequired,
  addDrinks: PropTypes.func.isRequired,
  addMeals: PropTypes.func.isRequired,
  foodType: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  cocktailsDrinks: { cocktails },
  foodMeals: { meals },
}) => ({
  cocktails,
  meals,
});

const mapDispatchToProps = {
  fi: fetchFoodByIngredient,
  fn: fetchFoodByName,
  fl: fetchFoodByFirstLetter,
  ci: fetchCocktailByIngredient,
  cn: fetchCocktailByName,
  cl: fetchCocktailByFirstLetter,
  addMeals: addFood,
  addDrinks: addCocktail,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
