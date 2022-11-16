import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import InfoToolTip from './InfoToolTip';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [deletingCard, setDeletingCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");

  // Запрос в API на получение карточек и данных пользователя
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getAppInfo()
        .then(([cards, userData]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  // Запрос в API на добавление лайка
  function handleCardLike(card) {
    api
      .addLike(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Запрос в API на удаление лайка
  function handleCardDislike(card) {
    api
      .removeLike(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Запрос в API на удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Запрос в auth на получение токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        }).catch((err) => {
          console.error(err);
        });
    }
  }, [history]);

  // Запрос в auth на регистрацию
  function onSignUp(email, password) {
    auth
      .signUp(email, password)
      .then(() => {
        setPopupImage(success);
        setPopupTitle("Вы успешно зарегистрировались!");
        history.push("/sign-in");
      }).catch(() => {
        handleAuthError();
      }).finally(handleInfoTooltip);
  }

  // Запрос в auth на вход
  function onSignIn(email, password) {
    auth
      .signIn(email, password).then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        history.push("/");
      }).catch(() => {
        handleAuthError();
        handleInfoTooltip();
      });
  }

  function handleAuthError() {
    setPopupImage(fail);
    setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setUserEmail(null);
    history.push("/sign-in");
    localStorage.removeItem("jwt");
  }

  function handleConfirmDelete(card) {
    setDeletingCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleInfoTooltip() {
    setIsInfoToolTipOpen(!isInfoToolTipOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  };

  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoToolTipOpen || selectedCard) {
      const onEscClose = (event) => {
        if (event.key === "Escape") {
          closeAllPopups();
        }
      };
      document.addEventListener("keydown", onEscClose);
      return () => {
        document.removeEventListener("keydown", onEscClose);
      };
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isInfoToolTipOpen, selectedCard]);

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((item) => {
        setCurrentUser({ ...currentUser, avatar: item.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .editProfile(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={onSignOut}
          userEmail={userEmail}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            onCardDelete={handleConfirmDelete}
          />

          <Route path="/sign-up">
            <Register
              onSignUp={onSignUp}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onSignIn={onSignIn}
            />
          </Route>

          <Route path="*">
            <Redirect to={!isLoggedIn ? "/sign-in" : "/"} />
          </Route>
        </Switch>

        {isLoggedIn &&
          <Footer />
        }

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          card={deletingCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <InfoToolTip
          image={popupImage}
          title={popupTitle}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
