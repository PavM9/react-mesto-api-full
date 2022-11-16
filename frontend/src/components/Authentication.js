import React from "react";
import { Route, Link } from "react-router-dom";

function Authentication({ title, onSubmit, buttonSubmitText }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form-container" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          autoComplete="on"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          value={password}
          autoComplete="on"
          onChange={handlePasswordInput}
          required
        />
        <button
          className="auth__submit-button"
          type="submit">{buttonSubmitText}</button>
      </form>
      <Route path="/sign-up">
        <p className="auth__text">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </p>
      </Route>;
    </section>
  );
}

export default Authentication;
