class PopupImage extends Popup {
    constructor(imageLink) {
        super();
        this.imageLink = imageLink;
        this.template = null;
    }

    render() {
        this.template = `<img src="" alt="picture" class="popup__image-box">`;
        this.container.insertAdjacentHTML('beforeend', this.template.trim());
        this.container.querySelector('.popup__image-box').setAttribute('src', this.imageLink);
        this.closeButton.classList.add('popup__close_image');
        this.open();
    }
}