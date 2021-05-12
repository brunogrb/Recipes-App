const FOOD_INITIAL_STATE = { meals: [], isFetching: false, isRequired: false };

function foodMeals(state = FOOD_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_FOOD':
    return { ...state, isFetching: true };
  case 'ADD_FOOD':
    return { ...state, meals: action.food.meals, isFetching: false };
  case 'REQUEST_REQUIRED_FOOD':
    return { ...state, isRequired: true };
  case 'STOP_REQUIRED_FOOD':
    return { ...state, isRequired: false };
  default:
    return state;
  }
}

export default foodMeals;
