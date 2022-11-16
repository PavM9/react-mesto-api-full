import React from "react";
import Authentication from "./Authentication";

function Register({ onSignUp }) {
  return (
    <Authentication
      title="Регистрация"
      buttonSubmitText="Зарегистрироваться"
      onSubmit={onSignUp}
    />
  );
}

export default Register;
