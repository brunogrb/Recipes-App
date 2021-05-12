import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ilustration from './undraw_breakfast_psiw.svg';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setisValid] = useState(false);
  const [isClicked, setisClicked] = useState(false);

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const MIN_NUMBER = 6;
    if (
      regexEmail.test(String(email).toLowerCase())
      && password.length > MIN_NUMBER
    ) {
      setisValid(true);
      if (isClicked) {
        const initialObj = {
          meals: {},
          cocktails: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(initialObj));
        localStorage.setItem('mealsToken', 1);
        localStorage.setItem('cocktailsToken', 1);
        localStorage.setItem('user', JSON.stringify({ email }));
      }
    } else {
      setisValid(false);
    }
  }, [email, password, isClicked]);

  return (
    <div className="form-wrapper">
      <img src={ ilustration } alt="ilustration" className="login-svg" />
      <form className="form-login">
        <input
          onChange={ (e) => setEmail(e.target.value) }
          type="email"
          data-testid="email-input"
          placeholder="Email"
          className="form-input"
        />
        <input
          onChange={ (e) => setPassword(e.target.value) }
          type="password"
          data-testid="password-input"
          placeholder="Password"
          className="form-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ () => setisClicked(true) }
          className="form-button"
        >
          ENTRAR
        </button>
        {isClicked && <Redirect to="/comidas" />}
      </form>
    </div>
  );
}
