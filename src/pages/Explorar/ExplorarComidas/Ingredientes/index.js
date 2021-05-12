import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import {
  fetchFoodByIngredient,
  requestRequired,
} from '../../../../redux/actions/foodActions';
import './styles.css';

function ExplorarComidasIngredientes(props) {
  const [ingredients, setIngredients] = useState([]);

  async function fetchIngredients() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const results = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    ).then((response) => response.json());
    const result = results.meals.slice(INITIAL_RETURN, MAX_RETURN);
    setIngredients(result);
  }

  function handleIngredient({ target }) {
    const { request, fetchFoodIngredient } = props;
    request();
    fetchFoodIngredient(target.alt);
  }

  function renderMeals() {
    if (!ingredients) return (<div>Loading...</div>);
    return (
      <div className="container-foods">
        { ingredients.map((item, index) => (
          <Link
            key={ index }
            onClick={ handleIngredient }
            to="/comidas"
            className="list-foods"
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              alt={ item.strIngredient }
            />
            <div data-testid={ `${index}-card-name` }>{ item.strIngredient }</div>
          </Link>
        ))}
      </div>
    );
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <Header
        title="Explorar Ingredientes"
      />
      { renderMeals() }
      <Footer />
    </div>
  );
}

ExplorarComidasIngredientes.propTypes = {
  fetchFoodIngredient: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  foods: state.foodMeals,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFoodIngredient: (food) => dispatch(fetchFoodByIngredient(food)),
  request: (food) => dispatch(requestRequired(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasIngredientes);
