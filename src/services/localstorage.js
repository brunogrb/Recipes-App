export function setItem(itemName, value) {
  localStorage.setItem(itemName, value);
}
export function getItem(itemName) {
  return localStorage.getItem(itemName);
}

export function doesFavoriteExists(id) {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const resp = JSON.parse(localStorage.getItem('favoriteRecipes')).find(
    (foodID) => id === foodID.id,
  ) !== undefined;
  return resp;
}

export function toggleFavorite(obj) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites.find((food) => obj.id === food.id) === undefined) {
    favorites.push(obj);
  } else {
    favorites.splice(favorites.indexOf(obj.id), 1);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

export function removeFavorite(obj) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorites = favorites.filter((favorite) => favorite.id !== obj.id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
}

export function addRecipeToLocalStorage(doneMealOrDrink, route) {
  const getItemSaved = JSON.parse(localStorage.getItem('doneRecipes'));
  const values = getItemSaved === null ? [] : getItemSaved;
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  if (route === 'comidas') {
    const recipe = {
      id: doneMealOrDrink[0].idMeal,
      type: 'comida',
      area: doneMealOrDrink[0].strArea,
      category: doneMealOrDrink[0].strCategory,
      alcoholicOrNot: '',
      name: doneMealOrDrink[0].strMeal,
      image: doneMealOrDrink[0].strMealThumb,
      doneDate: `${day}/${month}/${year}`,
      tags: [doneMealOrDrink[0].strTags],
    };
    values.push(recipe);
  } else {
    const recipe = {
      id: doneMealOrDrink[0].idDrink,
      type: 'bebida',
      area: '',
      category: doneMealOrDrink[0].strCategory,
      alcoholicOrNot: doneMealOrDrink[0].strAlcoholic,
      name: doneMealOrDrink[0].strDrink,
      image: doneMealOrDrink[0].strDrinkThumb,
      doneDate: `${day}/${month}/${year}`,
      tags: [doneMealOrDrink[0].strTags],
    };
    values.push(recipe);
  }
  localStorage.setItem('doneRecipes', JSON.stringify(values));
}
