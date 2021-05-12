import React from 'react';
import { fireEvent } from '@testing-library/react';
import Comidas from '../pages/Comidas/index';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DE COMIDA]: ', () => {
  test('rederiza pagina', async () => {
    const { findByText } = renderWithRouterAndStore(
      <Comidas />,
      { route: '/comidas' },
      storeMock,
    );
    const element = await findByText(/Corba/);

    expect(element).toBeInTheDocument();
  });

  test('explorar comidas', async () => {
    const { getByTestId, findByText } = renderWithRouterAndStore(
      <Comidas />,
      '',
      storeMock,
    );
    const exploreButton = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);
    const foodButton = getByTestId('explore-food');
    fireEvent.click(foodButton);
    const byIngredient = getByTestId('explore-by-ingredient');
    fireEvent.click(byIngredient);
    const element = await findByText('Apple Cider Vinegar');

    expect(element).toBeInTheDocument();
  });
});
