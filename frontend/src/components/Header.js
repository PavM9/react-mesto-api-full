import React from "react";
import logo from '../images/mesto-logo.svg';
import { Route, NavLink } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  function handleSignOut() {
    onSignOut();
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Место Россия"
      />
      <nav className="header__nav-container">
        <p className="header__email">{isLoggedIn ? userEmail : ""}</p>
        <Route path="/signup">
          <NavLink className="header__link" to={"/signin"}>
            Войти
          </NavLink>
        </Route>
        <Route path="/signin">
          <NavLink
            className="header__link"
            to={"/signup"}
          >
            Регистрация
          </NavLink>
        </Route>
        <Route exact path="/">
          <NavLink
            className="header__link"
            to={"/signin"}
            onClick={handleSignOut}
          >
            Выйти
          </NavLink>
        </Route>
      </nav>
    </header>
  );
}

export default Header
