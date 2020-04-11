import { Card } from "../cards/Card";

export class Harbor {
    cards: Card[];

    addCard(card: Card): void {
        if (card !== null) {
            this.cards.push(card);
        }
    }
}