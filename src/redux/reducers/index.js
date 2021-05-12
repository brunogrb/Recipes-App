import { combineReducers } from 'redux';
import cocktailsDrinks from './drinkReducer';
import foodMeals from './foodReducer';

const rootReducer = combineReducers({ cocktailsDrinks, foodMeals });

export default rootReducer;
