export default class Api {
    constructor(serverUrl, userKey) {
        this.serverUrl = serverUrl;
        this.userKey = userKey;
        Api.idCheckFlag = false;
        Api.sendingCardId = '';
        this.cardsArr = [];
        this.owner = {};
    }

    // Запрос карточек с сервера
    getInitialCards() {
        return fetch(`${this.serverUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.userKey
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Получение карточек с сервера: ${res.status} - Ok`);
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .then(value => {
                this.cardsArr = value;
                return value;
            })
            .catch(error => console.log('Ошибка соединения с сервером', error));
    }

    // Получаем данные пользователя с сервера и подгружаем на страницу
    getUserInfo() {
        return fetch(`${this.serverUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.userKey
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Подключение getUserInfo: ${res.status} - Ok`);
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .then((result) => {
                this.owner = result;
                return result;
            })
            .catch(error => console.log('Ошибка при загрузке информации о пользователе', error));
    }

    // Отправляем данные пользователя на сервер
    sendUserInfo(namePost, aboutPost) {
        return fetch(`${this.serverUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.userKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: namePost,
                about: aboutPost
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Данные о пользователе загружены на сервер: ${res.status} - Ok`);
                    return true;
                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .catch(error => console.log('Ошибка отправки данных пользователя', error));
    }

    // Отправляем карточку на сервер
    sendNewCard(nameCard, linkCard) {
        return fetch(`${this.serverUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.userKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameCard,
                link: linkCard
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Карточка успешно загружена: ${res.status} - Ok`);
                    return res.json();

                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .then(value => {
                Api.sendingCardId = value._id;
                console.log('ID Полученной карточки из метода', value._id);
                Api.idCheckFlag = true;
                return true;
            })
            .catch(error => console.log('Ошибка отправки карточки', error));
    }

    deleteCard(cardId) {
        return fetch(`${this.serverUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.userKey
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Карточка успешно удалена: ${res.status} - Ok`);
                    return true;
                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .catch(error => console.log('Ошибка отправки удаления карточки', error));
    }

    insertLike(cardId) {
        return fetch(`${this.serverUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.userKey
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Лайк поставлен: ${res.status} - Ok`);
                    return true;
                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .catch(error => console.log('Ошибка при постановке лайка', error));
    }

    removeLike(cardId) {
        return fetch(`${this.serverUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.userKey
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Лайк снят: ${res.status} - Ok`);
                    return true;
                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .catch(error => console.log('Ошибка при снятии лайка', error));
    }

    changeAvatar(avatarLink) {
        return fetch(`${this.serverUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.userKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log(`Новый аватар успешно загружен: ${res.status} - Ok`);
                    return true;
                } else {
                    return Promise.reject(`${res.status}`);
                }
            })
            .catch(error => console.log('Ошибка при смене аватара', error));
    }
}