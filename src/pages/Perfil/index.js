import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles.css';

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));
  // if(user === null){
  //   user = "email nao cadastrado"
  // }
  return (
    <div>
      <Header title="Perfil" />
      <div className="perfil">
        <h3 className="h3-email" data-testid="profile-email">
          {user !== null ? user.email : 'email'}
        </h3>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
          className="form-button"
        >
          Receitas Feitas
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          className="form-button"
        >
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
          className="form-button"
        >
          Sair
        </Link>
      </div>
      <Footer />
    </div>
  );
}
