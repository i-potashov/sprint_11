(function () {

    const placesContainer = document.querySelector('.places-list');
    const popupButton = document.querySelector('.user-info__button');
    const popupEditDataButton = document.querySelector('.user-info__button-data');
    const popupAvatarButton = document.querySelector('.user-info__photo');
    const pageUserJob = document.querySelector('.user-info__job');
    const pageUserName = document.querySelector('.user-info__name');
    const pageUserPhoto = document.querySelector('.user-info__photo');
    // Данные для подключения
    const USER_KEY = 'b2d86c91-2279-40d6-b20a-8426d4ad585f';
    const USER_GROUP = 'cohort5';
    const SERVER_IP = 'http://95.216.175.5/';

    let loadContent = {};

    const api = new Api(SERVER_IP, USER_GROUP, USER_KEY);

    Promise.resolve()
        .then(res => api.getUserInfo()
            .then(value => {
                pageUserName.textContent = api.owner.name;
                pageUserJob.textContent = api.owner.about;
                pageUserPhoto.style.backgroundImage = `url(${api.owner.avatar})`;
            })
        )
        .catch(error => console.log('Ошибка при загрузке карточек', error));

    Promise.resolve()
        .then(res => api.getInitialCards()
            .then(value => {
                loadContent = new CardList(placesContainer, api, api.cardsArr);
                loadContent.render();
            })
        )
        .catch(error => console.log('Ошибка при загрузке карточек', error));


    function popupDataHandler() {
        const popup = new PopupData(api);
        popup.render();
        popup.open();
        popupEditDataButton.blur();
    }

    function popupCardHandler() {
        const popup = new PopupCard(api, loadContent);
        popup.render();
        popup.open();
        popupButton.blur();
    }

    function popupAvatarHandler() {
        const popup = new PopupAvatar(api, pageUserPhoto);

        popup.render();
        popup.open();
        popupButton.blur();
    }

    popupEditDataButton.addEventListener('click', popupDataHandler);
    popupButton.addEventListener('click', popupCardHandler);
    popupAvatarButton.addEventListener('click', popupAvatarHandler);
})();

