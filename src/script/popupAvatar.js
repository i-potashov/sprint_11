class PopupAvatar extends Popup {
    constructor(api, photoContainer) {
        super();
        this.api = api;
        this.photoContainer = photoContainer;
        this.template = null;
        this.inputLink = null;
        this.submit = this.submit.bind(this);
    }

    render() {
        this.template = `
            <h3 class="popup__title">Обновить аватар</h3>
                <form class="popup__form" name="avatar">
                    <input type="text" name="link" class="popup__input popup__input_type_link-url"
                           placeholder="Ссылка на аватар">
                    <p class="popup__error popup__error_data_link popup__error_invalid"></p>
                    <button type="submit" class="button popup__button popup__button_data">Сохранить</button>
                </form>
            `;
        this.container.insertAdjacentHTML('beforeend', this.template.trim());
        this.inputLink = this.container.querySelector('.popup__input_type_link-url');
        this.formInputs = this.container.querySelectorAll('.popup__input');
        this.submitButton = this.container.querySelector('.button');
        const validateCard = new Validate(this.formInputs, this.submitButton);
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
        // Окно не закрывается, пока не обработан ответ от сервера
        Promise.resolve()
            .then(res => this.api.changeAvatar(this.inputLink.value)
                .then(res => {
                    if (res) {
                        this.photoContainer.style.backgroundImage = `url(${this.inputLink.value})`;
                        this.close();
                    } else {
                        this.close();
                        return (console.log('Отсутствует интернет соединение!'));
                    }
                })
            );
    }

    submitCardLoading() {
        this.contentWrap.querySelector('.popup__button_data').textContent = 'Загрузка...';
    }
}