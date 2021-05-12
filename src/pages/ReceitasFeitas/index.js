import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import './styles.css';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

function ReceitasFeitas() {
  const [filters, setFilter] = useState('');
  const [copiedAlert, setCopiedAlert] = useState(false);

  const mds = 1000;

  const copyTo = (route, id) => {
    const elem = `http://localhost:3000/${route}/${id}`;
    copy(elem);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, mds);
  };

  function renderFilters() {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilter('');
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setFilter('comida');
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilter('bebida');
          } }
        >
          Drinks
        </button>
      </div>
    );
  }

  function renderDoneReceipes() {
    const doneReceipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneReceipes) return <h3>Não há receitas feitas</h3>;
    const renderDoneReceipe = doneReceipes.filter((doneReceipe) => (
      doneReceipe.type.includes(filters)
    ));
    return renderDoneReceipe.map((doneReceipe, index) => (
      <div key={ index }>
        {doneReceipe.type === 'comida' ? (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/comidas/${doneReceipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ doneReceipe.image }
                alt={ doneReceipe.name }
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              { `${doneReceipe.area} - ${doneReceipe.category}` }
            </div>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('comidas', doneReceipe.id);
                } }
                className="f-icon"
              />
            </div>
            <Link
              data-testid={ `${index}-horizontal-name` }
              className="df-name"
              to={ `/comidas/${doneReceipe.id}` }
            >
              { doneReceipe.name }
            </Link>
            <div
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneReceipe.doneDate}
            </div>
            <div className="tags">
              { doneReceipe.tags.map((tag, current) => (
                <div
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ current }
                >
                  { tag }
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/bebidas/${doneReceipe.id}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ doneReceipe.image }
                alt={ doneReceipe.name }
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              { doneReceipe.alcoholicOrNot }
            </div>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('bebidas', doneReceipe.id);
                } }
                className="f-icon"
              />
            </div>
            <Link
              data-testid={ `${index}-horizontal-name` }
              className="df-name"
              to={ `/bebidas/${doneReceipe.id}` }
            >
              { doneReceipe.name }
            </Link>
            <div
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneReceipe.doneDate}
            </div>
            { doneReceipe.tags.map((tag, current) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ current }
              >
                { tag }
              </div>
            ))}
          </div>
        )}
        { copiedAlert && <p>Link copiado!</p> }
      </div>
    ));
  }

  useEffect(() => {
    renderDoneReceipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" searchButtonExists={ false } />
      { renderFilters() }
      { renderDoneReceipes() }
    </div>
  );
}

export default ReceitasFeitas;
