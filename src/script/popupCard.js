import Popup from "./popup";
import Validate from "./validate";
import Api from "./api";

export default class PopupCard extends Popup {
    constructor(api, loadContent) {
        super();
        this.api = api;
        this.loadContent = loadContent;
        this.ownerId = api.owner._id;
        this.template = null;
        this.inputName = null;
        this.inputLink = null;
        this.submit = this.submit.bind(this);
    }

    render() {
        this.template = `
            <h3 class="popup__title">Новое место</h3>
                <form class="popup__form" name="new">
                    <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
                    <p class="popup__error popup__error_data_picture-name popup__error_invalid"></p>
                    <input type="text" name="link" class="popup__input popup__input_type_link-url"
                           placeholder="Ссылка на картинку">
                    <p class="popup__error popup__error_data_link popup__error_invalid"></p>                
                    <button type="submit" class="button popup__button popup__button_place">+</button>
                </form>
            `;
        this.container.insertAdjacentHTML('beforeend', this.template.trim());
        this.inputName = this.container.querySelector('.popup__input_type_name');
        this.inputLink = this.container.querySelector('.popup__input_type_link-url');
        this.formInputs = this.container.querySelectorAll('.popup__input');
        this.submitButton = this.container.querySelector('.button');
        const validateCard = new Validate(this.formInputs, this.submitButton);
        this.inputName.addEventListener('input', validateCard.checkInput);
        this.inputLink.addEventListener('input', validateCard.checkInput);
        this.submitButton.addEventListener('click', this.submit);
        this.contentWrap.classList.add('popup__content_data');
        this.closeButton.classList.add('popup__close_data');
        this.open();
        validateCard.checkSubmitStatus();
    }

    submit(e) {
        e.preventDefault();
        this.submitCardLoading();
        const that = this;

        Promise.resolve()
            .then(res => this.api.sendNewCard(this.inputName.value, this.inputLink.value)
                .then(res => {
                    if (res) {
                        appendCardId();
                    } else {
                        this.close();
                        return (console.log('Отсутствует интернет соединение!'));
                    }
                })
            );

        // appendCardId() - Для загрузки информации о карточке, для дальнейших действий
        // без перезагрузки страницы
        function appendCardId() {
            if ((Api.sendingCardId.length > 0) && (Api.idCheckFlag === true)) {
                const cardArr = {
                    _id: Api.sendingCardId,
                    name: that.inputName.value,
                    link: that.inputLink.value,
                    likes: [],
                    owner: {_id: that.ownerId}
                };
                that.loadContent.addCard(cardArr);
                that.loadContent.cardsArray.push(cardArr);
                that.close();
                Api.idCheckFlag = false;
            } else {
                return null;
            }
        }
    }

    submitCardLoading() {
        this.contentWrap.querySelector('.popup__button_place').style.fontSize = '18px';
        this.contentWrap.querySelector('.popup__button_place').textContent = 'Загрузка...';
    }
}