import React from 'react';
// import { render, screen } from '@testing-library/react';
import EmProgresso from '../pages/EmProgresso';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DE EM PROGRESSO]: ', () => {
  test('rederiza pagina', () => {
    const { getByText } = renderWithRouterAndStore(
      <EmProgresso />,
      '/comidas/53026/in-progress',
      storeMock,
    );

    const element = getByText('GG');

    // expect(history.location.pathname).toBe(/in-progress/);
    expect(element).toBeInTheDocument();
  });
  test('checa rota', async () => {
    const { history } = renderWithRouterAndStore(
      <EmProgresso />,
      '',
      storeMock,
    );
    expect(history.location.pathname).toBe('/');
  });
});
