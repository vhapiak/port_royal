import { Card } from "../cards/Card";

export class Harbor {
    cards: Card[];

    constructor() {
        this.cards = [];
    }

    addCard(card: Card): void {
        if (card) {
            this.cards.push(card);
        }
    }
}