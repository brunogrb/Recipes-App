import React from 'react';
import { fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithRouterAndStore } from './helper/testConfig';
import storeMock from './helper/mock';

describe('[PÁGINA DE LOGIN]: ', () => {
  test('rederiza pagina', () => {
    const { history } = renderWithRouterAndStore(
      <Login />,
      '',
      storeMock,
    );

    expect(history.location.pathname).toBe('/');
  });
  test('faz login', () => {
    const { getByTestId, history } = renderWithRouterAndStore(
      <Login />,
      '',
      storeMock,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'testestestest1@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456789312321' } });
    fireEvent.click(loginButton);

    expect(history.location.pathname).toBe('/comidas');
  });
});
