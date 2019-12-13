class Api {
    constructor(serverIp, userGroup, userKey) {
        this.serverIp = serverIp;
        this.userGroup = userGroup;
        this.userKey = userKey;
        Api.idCheckFlag = false;
        Api.sendingCardId = '';
        this.cardsArr = [];
        this.owner = {};
    }

    // Запрос карточек с сервера
    getInitialCards() {
        return fetch(`${this.serverIp}${this.userGroup}/cards`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/users/me`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/users/me`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/cards`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/cards/${cardId}`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/cards/like/${cardId}`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/cards/like/${cardId}`, {
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
        return fetch(`${this.serverIp}${this.userGroup}/users/me/avatar`, {
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

/**
 * Здравствуйте.
 *
 * Я буду писать здесь, потому что работа в основном касается этого класса.
 *
 * Что надо исправить:
 * Ненадо в классе прописывать http://95.216.175.5 ip может поменятся и надо будет прописывать в нескольких местах
 * Класс вообше не должен знать об IP
 *
 * Класс не должен уметь отрисовавыть карточки или управлять DOM
 * удалить
 *                 this.mainContent = result; // Получаем массив карточек
 this.newCardList(); // Созаем класс создания карточек
 this.renderInitialCards(); // Отрисовываем карточки
 *
 * Удалить
 *                 apiControl.receivedOwner = Object.assign(result);
 this.containerUserName.textContent = result.name;
 this.containerUserJob.textContent = result.about;
 this.containerUserPhoto.style.backgroundImage = `url(${result.avatar})`;
 * и так далее...
 * Для этого есть другие классы которые как раз и должны этим заниматься.
 *
 * Прописали .catch(); но он ничего не делает
 *
 * Удалить методы
 *     newCardList() {
        renderInitialCards()
        они никакого отношения к классу не имеют
 *
 * Непонятна роль метода checkDataValue()
 *
 * Очень много параметров
 *   constructor(userGroup, userKey, jobContainer, nameContainer, avatarContainer, placesContainer)
 * Максимум 3-4 https://refactoring.guru/ru/smells/long-parameter-list
 *
 *
 * В валидации метод checkInput(e) очень сложный для восприятия
 * Решение, разбить на небольшие
 *
 *
 *
 */


/**
 * Снова здравствуйте.
 * Теперь у вас класс работает в одну сторону. То есть Вы не знаете что он делает
 * Загружаете сайт, отключаете интернет и делаете лайк, или меняете информацию в профиле и всё работает
 * А работать не должно. Интернета нет.
 * Надо чтобы класс возвращал на место вызова метода после того как получит ответ и использовал данные для формирования
 * контента.
 *
 * Удаление карточки тоже без интернета отработало
 *
 */

/*
Ответ:
Здравствуйте, исправил:
При отсутствии интернета нельзя отправить:
1. Карточку нельзя отправить
2. Лайк нельзя поставить или снять
3. Карточку нельзя удалить
4. Профиль нельзя обновить
 */

/**
 * Принимается
 *
 * В валидации в методе     checkInput(e)  у вас слишком много условий, это плохо
 * в этой переменной нет смысла
 *  this.template = null;
 *
 * Шаблон бы я вынес в отдельный метод, только шаблон
 * Могу долго рассписывать, но всё придёт с опытом
 *
 * @koras
 *
 */