import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import {
  fetchFoodByName,
  fetchFoodByCategory,
  stopRequired,
} from '../../redux/actions/foodActions';
import './styles.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';

function Comidas(props) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  function renderMeals() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const { foods } = props;
    const { meals, isFetching } = foods;
    if (isFetching) {
      return (
        <div className="container-drinks">
          <div className="loader" />
        </div>
      );
    }
    if (meals === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    // if (meals.length === 1) {
    //   history.push(`/comidas/${meals[0].idMeal}`);
    // }
    const comida = meals.slice(INITIAL_RETURN, MAX_RETURN);
    return (
      <div className="container-foods">
        {comida.map((item, index) => (
          <Link
            key={ index }
            className="list-drinks"
            to={ `/comidas/${item.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <div data-testid={ `${index}-card-name` } className="df-name">
              {item.strMeal}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  async function fetchCategories() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 5;
    const results = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    ).then((response) => response.json());
    const result = results.meals.slice(INITIAL_RETURN, MAX_RETURN);
    setCategories(result);
  }

  function handleCategories({ target }) {
    const { fetchFoodCategory, fetchFood } = props;
    if (currentCategory === target.value || target.value === '') {
      setCurrentCategory('');
      return fetchFood('');
    }
    setCurrentCategory(target.value);
    fetchFoodCategory(target.value);
  }

  function renderCategories() {
    if (!categories) return <div>Loading Categories</div>;
    return (
      <div className="tags-wrapper">
        <button
          type="button"
          data-testid="All-category-filter"
          value=""
          onClick={ handleCategories }
          className="button-category"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            value={ category.strCategory }
            onClick={ handleCategories }
            className="button-category"
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    );
  }

  useEffect(() => {
    const { fetchFood, foods, notRequired } = props;
    if (foods.isRequired) {
      notRequired();
    } else {
      fetchFood('');
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <Header
        title="Comidas"
        searchButtonExists
        setIsSearchBarVisible={ setIsSearchBarVisible }
      />
      {isSearchBarVisible && <SearchBar foodType="comidas" />}
      {renderCategories()}
      {renderMeals()}
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  fetchFood: PropTypes.func.isRequired,
  fetchFoodCategory: PropTypes.func.isRequired,
  foods: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool,
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  notRequired: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  foods: state.foodMeals,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (food) => dispatch(fetchFoodByName(food)),
  fetchFoodCategory: (food) => dispatch(fetchFoodByCategory(food)),
  notRequired: () => dispatch(stopRequired()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
