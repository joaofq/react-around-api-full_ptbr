import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <Link to="./" className="logo">
        <img src={logo} alt="Around the U.S. logo" />
      </Link>
      {children}
    </header>
  );
}

export default Header;
