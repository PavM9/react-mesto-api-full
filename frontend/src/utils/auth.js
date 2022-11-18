class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

//Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //Регистрация
  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
    }).then(this._checkResponse);
  }

  //Вход
  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
    }).then(this._checkResponse);
  }

  //Выход
  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  //Получение токена
  // getToken(jwt) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${jwt}`
  //     },
  //   }).then(this._checkResponse);
  // }

  getToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export default new Auth({
  // baseUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'https://api.pavm9.nomoredomains.icu',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
