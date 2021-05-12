import React from 'react';
// import { render, screen } from '@testing-library/react';
import Bebidas from '../pages/Bebidas/index';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DE BEBIDA]: ', () => {
  test('rederiza pagina', async () => {
    const { findByText } = renderWithRouterAndStore(<Bebidas />, '', storeMock);
    const element = await findByText('GG');

    // Wait for page to update with query text
    expect(element).toBeInTheDocument();
  });

  // test('rederiza pagina', async () => {
  //   const { findByText } = renderWithRouterAndStore(
  //     <Bebidas />,
  //     '',
  //     storeMock,
  //   );
  //   const element = await findByText('GG');

  //   // Wait for page to update with query text
  //   expect(element).toBeInTheDocument();
  // });
});
