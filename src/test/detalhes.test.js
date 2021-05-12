import React from 'react';
// import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DETALHES]: ', () => {
  test('renderiza detalhe de comidas', async () => {
    const { findByTestId, findByText, history } = renderWithRouterAndStore(
      <Comidas />,
      { route: '/comidas' },
      storeMock,
    );
    const elementToClick = await findByTestId('1-card-name');
    expect(elementToClick).toHaveTextContent('Kumpir');

    fireEvent.click(elementToClick);

    expect(history.location.pathname).toBe('/comidas/52978');
    const element = await findByText('Kumpir');
    expect(element).toBeInTheDocument();
  });

  test('renderiza detalhe de bebidas', async () => {
    const { findByTestId, findByText, history } = renderWithRouterAndStore(
      <Bebidas />,
      { route: '/bebidas' },
      storeMock,
    );

    const elementToClick = await findByTestId('2-card-img');
    expect(elementToClick).toHaveAttribute(
      'src',
      'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    );

    fireEvent.click(elementToClick);

    expect(history.location.pathname).toBe('/bebidas/13501');
    const element = await findByText('ABC');
    const recomended = findByTestId('0-recomendation-title');
    expect(recomended).toHaveTextContent('Corba');
    expect(findByTestId('1-recomendation-card')).toBeInTheDocument();
    expect(findByTestId('2-recomendation-card')).toBeInTheDocument();
    expect(findByTestId('3-recomendation-card')).toBeInTheDocument();
    expect(findByTestId('4-recomendation-card')).toBeInTheDocument();
    expect(findByTestId('5-recomendation-card')).toBeInTheDocument();

    expect(element).toBeInTheDocument();
  });
});
