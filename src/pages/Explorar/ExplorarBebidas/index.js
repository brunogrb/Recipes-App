import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

function ExplorarBebidas() {
  const [id, setId] = useState();

  async function fetchRandom() {
    const result = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    ).then((response) => response.json());
    setId(result.drinks[0].idDrink);
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="explore">
      <Header title="Explorar Bebidas" />
      <div className="links-wrapper">
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          className="form-button"
        >
          Por Ingredientes
        </Link>
        <Link
          to={ `/bebidas/${id}` }
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

export default ExplorarBebidas;
