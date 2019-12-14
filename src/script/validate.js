class Validate {
    constructor(forms, button) {
        this.forms = forms;
        this.button = button;
        this.checkInput = this.checkInput.bind(this);
        this.errorMessage = {
            errorEmpty: {rus: 'Это обязательное поле'},
            errorCount: {rus: 'Должно быть от 2 до 30 символов'},
            errorLink: {rus: 'Здесь должна быть ссылка'}
        };
    }

    checkInput(e) {
        if (e.target.value.length === 0) {
            this.emptyError(e);
        } else if (e.target.classList.contains('popup__input_type_link-url')) {
            if (e.target.value.match(/(^https?:\/\/)/i) != null) {
                this.removeError(e);
            } else {
                this.linkError(e);
            }
        } else if (e.target.value.length === 1 || e.target.value.length > 30) {
            this.valueError(e);
        } else {
            this.removeError(e);
        }
        this.checkSubmitStatus();
    }

    emptyError(e) {
        e.target.nextElementSibling.textContent = this.errorMessage.errorEmpty.rus;
        e.target.nextElementSibling.classList.add('popup__error_invalid');
    }

    linkError(e) {
        e.target.nextElementSibling.textContent = this.errorMessage.errorLink.rus;
        e.target.nextElementSibling.classList.add('popup__error_invalid');
    }

    valueError(e) {
        e.target.nextElementSibling.textContent = this.errorMessage.errorCount.rus;
        e.target.nextElementSibling.classList.add('popup__error_invalid');
    }

    removeError(e) {
        e.target.nextElementSibling.classList.remove('popup__error_invalid');
        e.target.nextElementSibling.textContent = '';
    }

    checkSubmitStatus() {
        let checkVal = true;
        this.forms.forEach(value => {
            if (value.nextElementSibling.classList.contains('popup__error_invalid')) {
                checkVal = (checkVal && false);
            } else {
                checkVal = (checkVal && true);
            }
        });
        checkVal ? this.enableSubmit() : this.disableSubmit();
    }

    disableSubmit() {
        this.button.classList.add('popup__button_disabled');
        this.button.setAttribute('disabled', 'true');
    }

    enableSubmit() {
        this.button.classList.remove('popup__button_disabled');
        this.button.removeAttribute('disabled');
    }
}