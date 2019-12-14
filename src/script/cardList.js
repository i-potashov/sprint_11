class CardList {
    constructor(container, api, cardsArray) {
        this.api = api;
        this.container = container;
        this.cardsArray = cardsArray;
    }

    addCard(value) {
        const card = new Card(value, this.api);
        const cardTemple = card.create();
        this.container.append(cardTemple);
    }

    render() {
        this.cardsArray.forEach(value => this.addCard(value));
    }
}