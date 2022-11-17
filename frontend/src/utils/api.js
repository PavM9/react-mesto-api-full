class Api {
  constructor({ groupUrl, headers }) {
    this._groupUrl = groupUrl;
    this._headers = headers;
  }

//Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //Загрузка информации о пользователе с сервера
  _getProfile() {
    return fetch(`${this._groupUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //Загрузка карточек с сервера
  _getInitialCards() {
    return fetch(`${this._groupUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getAppInfo() {
    return Promise.all([this._getInitialCards(), this._getProfile()]);
  }


  //Редактирование профиля
  editProfile(data) {
    return fetch(`${this._groupUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
    // делает из объекта строку
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  //Добавление новой карточки
  addCard(data) {
    return fetch(`${this._groupUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  //Удаление карточки
  deleteCard(_id) {
    return fetch(`${this._groupUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //Cнятие лайка
  removeLike(_id) {
    return fetch(`${this._groupUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //Постановка лайка
  addLike(_id) {
    return fetch(`${this._groupUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //Обновление аватара пользователя
  editAvatar(data) {
    return fetch(`${this._groupUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }
}

export default new Api({
  // groupUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  groupUrl: 'https://api.pavm9.nomoredomains.icu',
  headers: {
    // authorization: '56dc158d-aab3-4147-9791-8bd358db9073',
    'Content-Type': 'application/json'
  }
});
