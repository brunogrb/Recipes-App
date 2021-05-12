export const addFood = (food) => ({ type: 'ADD_FOOD', food });

export const requestingData = () => ({ type: 'REQUEST_FOOD' });

export const requestRequired = () => ({ type: 'REQUEST_REQUIRED_FOOD' });

export const stopRequired = () => ({ type: 'STOP_REQUIRED_FOOD' });

export function fetchFoodById(id) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByIngredient(ingredient) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByName(name) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByFirstLetter(name) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByCategory(category) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByArea(area) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}
