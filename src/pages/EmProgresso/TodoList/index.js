import React, { useState } from 'react';
import PropTypes, { arrayOf } from 'prop-types';

export default function TodoList({ id, route, ingredients, setisEnded }) {
  const progressStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let key = 'meals';
  if (route === 'bebidas') key = 'cocktails';
  const checkEmpty = ingredients.map(() => false);

  const [checks, setChecks] = useState(
    progressStatus && progressStatus[key][id]
      ? progressStatus[key][id]
      : checkEmpty,
  );
  const [update, setUpdate] = useState(false);

  const updateStorage = () => {
    const initialObj = {
      meals: {},
      cocktails: {},
    };
    let progressObj = initialObj;
    if (progressStatus) progressObj = progressStatus;
    progressObj[key][id] = checks;
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressObj));
  };

  const isDone = (e) => {
    const checkStatus = checks;
    checkStatus[e.target.id] = !checkStatus[e.target.id];
    setUpdate(!update);
    setChecks(checkStatus);
    updateStorage();
    const a = checkStatus.filter((ingredient) => !ingredient);
    const ZERO = 0;
    if (a.length === ZERO) {
      return setisEnded(true);
    }
    return setisEnded(false);
  };

  const renderForm = () => (
    <form>
      {ingredients.map((ing, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            id={ index }
            type="checkbox"
            checked={ checks[index] }
            onClick={ isDone }
          />
          <label htmlFor={ index }>{ing[1]}</label>
        </div>
      ))}
    </form>
  );

  return <div>{renderForm()}</div>;
}

TodoList.propTypes = {
  ingredients: arrayOf(PropTypes.string).isRequired,
  setisEnded: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
