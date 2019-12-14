import PopupImage from "./popupImage";

export default class Card {
    constructor(cardData, api) {
        this.api = api;
        this.cardData = cardData;
        this.element = null;
        this.name = this.cardData.name;
        this.link = this.cardData.link;
        this.likes = this.cardData.likes;
        this.cardId = this.cardData._id;
        this.cardOwnerId = this.cardData.owner._id;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.imageBox = this.imageBox.bind(this);
        this.newElement = null;
    }

    create() {
        const template = `
            <div class="place-card">
                <div class="place-card__image">
                    <button class="place-card__delete-icon"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name"></h3>
                    <div class="place-card__container">
                    <button class="place-card__like-icon"></button>
                    <p class="place-card__like-count"></p>
                    </div>
                </div>
            </div>
            `;
        this.element = document.createElement('div');
        this.element.insertAdjacentHTML('beforeend', template.trim());
        this.element.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
        this.element.querySelector('.place-card__name').textContent = this.name;
        // Отображаем количество лайков
        this.element.querySelector('.place-card__like-count').textContent = String(this.likes.length);
        this.addListeners();
        this.checkDeleteButton(this.api.owner._id);
        this.newElement = this.element.firstChild;
        this.checkMyLike(this.api.owner);
        return this.element.firstChild;
    }

    checkDeleteButton(ownerId) {
        if (this.cardOwnerId !== ownerId) {
            this.element.firstChild.querySelector('.place-card__delete-icon').style.display = 'none';
        }
    }

    // Если в карточка лайкнута, проверяем был ли там наш лайк и отмечаем это
    checkMyLike(owner) {
        this.likes.forEach(value => {
            if (JSON.stringify(value) === JSON.stringify(owner)) {
                this.newElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            }
        });
    }

    addListeners() {
        this.element.firstChild.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.element.firstChild.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.element.firstChild.querySelector('.place-card__image').addEventListener('click', this.imageBox);
    }

    remove(e) {
        if (confirm('Вы действительно хотите удалить эту карточку?')) {
            Promise.resolve()
                .then(res => this.api.deleteCard(this.cardId)
                    .then(res => {
                        if (res) {
                            e.target.closest('.place-card').remove();
                        } else {
                            return (console.log('Отсутствует интернет соединение!'));
                        }
                    })
                );
        }
    }

    like(e) {
        if (e.target.classList.contains('place-card__like-icon_liked')) {
            Promise.resolve()
                .then(res => this.api.removeLike(this.cardId)
                    .then(res => {
                        if (res) {
                            e.target.classList.remove('place-card__like-icon_liked');
                            this.likes.shift();
                            this.newElement.querySelector('.place-card__like-count').textContent = String(this.likes.length);
                        } else {
                            return (console.log('Отсутствует интернет соединение!'));
                        }
                    })
                );
        } else {
            Promise.resolve()
                .then(res => this.api.insertLike(this.cardId)
                    .then(res => {
                        if (res) {
                            e.target.classList.add('place-card__like-icon_liked');
                            this.likes.push(1);
                            this.newElement.querySelector('.place-card__like-count').textContent = String(this.likes.length);
                        } else {
                            return (console.log('Отсутствует интернет соединение!'));
                        }
                    })
                );
        }
    }

    imageBox(e) {
        if (e.target.classList.contains('place-card__image')) {
            this.popupImage = new PopupImage(this.link);
            this.popupImage.render();
        }
    }
}