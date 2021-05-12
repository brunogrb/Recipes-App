import meals from '../../../cypress/mocks/meals';
import drinks from '../../../cypress/mocks/drinks';

const storeMock = {
  cocktailsDrinks: {
    cocktails: drinks.drinks,
    isFetching: false,
    isRequired: false,
  },
  foodMeals: {
    meals: meals.meals,
    isFetching: false,
    isRequired: false,
  },
};

export default storeMock;
