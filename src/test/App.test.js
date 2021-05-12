import React from 'react';
import { renderWithRouterAndStore } from './helper/testConfig';
import App from '../App';

test('Farewell, front-end', () => {
  const { history } = renderWithRouterAndStore(<App />);
  // const linkElement = getByText(/TRYBE/i);
  // expect(linkElement).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});
