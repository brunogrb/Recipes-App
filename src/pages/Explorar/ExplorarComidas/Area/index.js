import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import SearchBar from '../../../../components/SearchBar';
import {
  fetchFoodByName,
  fetchFoodByArea,
  requestRequired,
} from '../../../../redux/actions/foodActions';
import './styles.css';

function ExplorarAreaComidas(props) {
  const [areas, setAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState('All');
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  async function fetchArea() {
    const results = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    ).then((response) => response.json());
    setAreas(results.meals);
  }

  function handleChangeSelected({ target }) {
    const { value } = target;
    setCurrentArea(value);
  }

  function renderOptions() {
    if (!areas) return <div>Loading...</div>;
    return (
      <label htmlFor="area">
        <select
          name="area"
          value={ currentArea }
          data-testid="explore-by-area-dropdown"
          onChange={ handleChangeSelected }
        >
          <option data-testid="All-option" value="All">All</option>
          { areas.map((area, index) => (
            <option
              key={ index }
              value={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strArea }
            </option>
          ))}
        </select>
      </label>
    );
  }

  function renderMeals() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const { foods } = props;
    const { meals, isFetching } = foods;
    if (isFetching) return <div>Loading...</div>;
    const comida = meals.slice(INITIAL_RETURN, MAX_RETURN);
    return (
      <div className="container-foods">
        { comida.map((item, index) => (
          <Link
            key={ index }
            className="list-foods"
            to={ `/comidas/${item.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <div data-testid={ `${index}-card-name` }>{ item.strMeal }</div>
          </Link>
        ))}
      </div>
    );
  }

  useEffect(() => {
    const { fetchFoodArea, foodName } = props;
    if (currentArea === 'All') {
      foodName('');
    } else {
      fetchFoodArea(currentArea);
    }
  }, [currentArea]);

  useEffect(() => {
    fetchArea();
  }, []);

  return (
    <div>
      <Header
        title="Explorar Origem"
        searchButtonExists
        setIsSearchBarVisible={ setIsSearchBarVisible }
      />
      {isSearchBarVisible && <SearchBar foodType="bebidas" />}
      { renderOptions() }
      { renderMeals() }
      <Footer />
    </div>
  );
}

ExplorarAreaComidas.propTypes = {
  foodName: PropTypes.func.isRequired,
  fetchFoodArea: PropTypes.func.isRequired,
  foods: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    meals: PropTypes.shape({
      slice: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  foods: state.foodMeals,
});

const mapDispatchToProps = (dispatch) => ({
  foodName: (food) => dispatch(fetchFoodByName(food)),
  fetchFoodArea: (food) => dispatch(fetchFoodByArea(food)),
  request: (food) => dispatch(requestRequired(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarAreaComidas);
