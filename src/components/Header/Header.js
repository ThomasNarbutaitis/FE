import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from '../UI/Container';
import css from './Header.module.css';
import logo from '../../assets/Logo.png';
import { useAuthCtx } from '../../store/authContext';

function Header() {
  const { isUserLoggedIn, logout } = useAuthCtx();

  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <NavLink className={css.link} to='#logo'>
            <img className={css.logo} src={logo} alt='logo img' />
          </NavLink>
          <div>
            {!isUserLoggedIn && (
              <NavLink className={css.link} to='/register'>
                Register
              </NavLink>
            )}

            {!isUserLoggedIn && (
              <NavLink className={css.link} to='/login'>
                Login
              </NavLink>
            )}

            <NavLink className={css.link} to='/'>
              Home
            </NavLink>

            {isUserLoggedIn && (
              <NavLink className={css.link} to='/addQuestionPage'>
                Ask a question
              </NavLink>
            )}

            {isUserLoggedIn && (
              <Link onClick={logout} className={css.link} to='/'>
                Logout
              </Link>
            )}
          </div>
        </nav>
      </Container>
      <hr />
    </header>
  );
}

export default Header;
