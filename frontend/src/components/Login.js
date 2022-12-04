import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(email, password);
  }

  return (
    <main className="main">
      <Header>
        <Link to="/signup" className="header__link">
          Criar conta
        </Link>
      </Header>
      <h2 className="form__title">Entrar </h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="email"
          placeholder="E-mail"
          required
          onChange={handleEmailChange}
        />
        <span className="form__error"></span>
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          required
          minLength="8"
          onChange={handlePasswordChange}
        />
        <span className="form__error"></span>
        <button className="form__button" type="submit" onSubmit={handleSubmit}>
          Entrar
        </button>
        <Link to="/signup" className="form__link">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </form>
      <Footer />
    </main>
  );
}

export default Login;
