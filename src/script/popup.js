export default class Popup {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.closeButton = document.querySelector('.popup__close');
        this.container = document.querySelector('.popup__container');
        this.contentWrap = document.querySelector('.popup__content');
        this.close = this.close.bind(this);
    }

    open() {
        this.popup.classList.add('popup_is-opened');
        this.addListeners();
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
        this.removeListeners();
        while (this.container.firstChild) {
            this.container.firstChild.remove();
        }
        this.closeButton.setAttribute('class', 'popup__close');
        this.contentWrap.setAttribute('class', 'popup__content');
    }

    addListeners() {
        this.closeButton.addEventListener('click', this.close);
    }

    removeListeners() {
        this.closeButton.removeEventListener('click', this.close);
    }
}