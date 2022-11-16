import React from "react";
import Authentication from "./Authentication";

function Login({ onSignIn }) {
  return (
    <Authentication
      title="Вход"
      buttonSubmitText="Войти"
      onSubmit={onSignIn}
    />
  );
}

export default Login;
