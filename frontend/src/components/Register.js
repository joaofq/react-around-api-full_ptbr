import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Register(props) {
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
    props.handleSignup(email, password);
  }

  return (
    <main className="main">
      <Header>
        <Link to="/signin" className="header__link">
          Entrar
        </Link>
      </Header>
      <h2 className="form__title">Inscrever-se</h2>
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
          Inscrever-se
        </button>
        <Link to="/signin" className="form__link">
          Já é um membro? Faça o login aqui!{' '}
        </Link>
      </form>
      <Footer />
    </main>
  );
}

export default Register;
