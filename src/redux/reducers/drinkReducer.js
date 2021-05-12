const COCKTAIL_INITIAL_STATE = { cocktails: [], isFetching: false, isRequired: false };

function cocktailsDrinks(state = COCKTAIL_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_COCKTAIL':
    return { ...state, isFetching: true };
  case 'ADD_COCKTAIL':
    return { ...state, cocktails: action.cocktails.drinks, isFetching: false };
  case 'REQUEST_REQUIRED_DRINK':
    return { ...state, isRequired: true };
  case 'STOP_REQUIRED_DRINK':
    return { ...state, isRequired: false };
  default:
    return state;
  }
}

export default cocktailsDrinks;
