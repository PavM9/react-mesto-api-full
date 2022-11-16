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
        <Route path="/sign-up">
          <NavLink className="header__link" to={"/sign-in"}>
            Войти
          </NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink
            className="header__link"
            to={"/sign-up"}
          >
            Регистрация
          </NavLink>
        </Route>
        <Route exact path="/">
          <NavLink
            className="header__link"
            to={"/sign-in"}
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
