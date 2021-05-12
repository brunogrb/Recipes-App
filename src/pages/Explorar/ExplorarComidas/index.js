import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function ExplorarComidas() {
  const [id, setId] = useState();

  async function fetchRandom() {
    const result = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php',
    ).then((response) => response.json());

    setId(result.meals[0].idMeal);
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="explore">
      <Header title="Explorar Comidas" />
      <div className="links-wrapper">
        <Link
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="form-button"
        >
          Por Ingredientes
        </Link>

        <Link
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
          className="form-button"
        >
          Por Local de Origem
        </Link>

        <Link
          to={ `/comidas/${id}` }
          data-testid="explore-surprise"
          className="form-button"
        >
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
