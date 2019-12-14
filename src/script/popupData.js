class PopupData extends Popup {
    constructor(api) {
        super();
        this.api = api;
        this.template = null;
        this.inputJob = null;
        this.inputName = null;
        this.submit = this.submit.bind(this);
        this.userJob = document.querySelector('.user-info__job');
        this.userName = document.querySelector('.user-info__name');
    }

    render() {
        this.template = `
            <h3 class="popup__title">Редактировать профиль</h3>
                <form class="popup__form" name="data">
                    <input type="text" name="name" required class="popup__input popup__input_type_name" placeholder="Имя">
                    <p class="popup__error popup__error_data_name"></p>
                    <input type="text" name="job" required class="popup__input popup__input_type_job"
                           placeholder="О себе">
                    <p class="popup__error popup__error_data_job"></p>
                    <button type="submit" class="button popup__button popup__button_data">Сохранить</button>
                </form>
            `;
        this.container.insertAdjacentHTML('beforeend', this.template.trim());
        this.inputName = this.container.querySelector('.popup__input_type_name');
        this.inputJob = this.container.querySelector('.popup__input_type_job');
        this.formInputs = this.container.querySelectorAll('.popup__input');
        this.submitButton = this.container.querySelector('.button');
        const validatePopup = new Validate(this.formInputs, this.submitButton);
        this.inputName.addEventListener('input', validatePopup.checkInput);
        this.inputJob.addEventListener('input', validatePopup.checkInput);
        this.submitButton.addEventListener('click', this.submit);
        this.contentWrap.classList.add('popup__content_data');
        this.closeButton.classList.add('popup__close_data');
        this.loadUserData();
        this.open();
        validatePopup.checkSubmitStatus();
    }

    loadUserData() {
        this.inputName.value = this.userName.textContent;
        this.inputJob.value = this.userJob.textContent;
    }

    submit(e) {
        e.preventDefault();
        this.submitLoading();
        // Окно не закрывается, пока не обработан ответ от сервера
        Promise.resolve()
            .then(res => this.api.sendUserInfo(this.inputName.value, this.inputJob.value)
                .then(res => {
                    if (res) {
                        this.userName.textContent = this.inputName.value;
                        this.userJob.textContent = this.inputJob.value;
                        this.close();
                    } else {
                        this.close();
                        return (console.log('Отсутствует интернет соединение!'));
                    }
                })
            );
    }

    submitLoading() {
        this.contentWrap.querySelector('.popup__button_data').textContent = 'Загрузка...';
    }
}