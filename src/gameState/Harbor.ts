import { Card } from "../cards/Card";

export class Harbor {
    cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    addCard(card: Card): void {
        if (card) {
            this.cards.push(card);
        }
    }

    removeCard(card: Card): void {
        const index = this.cards.indexOf(card);
        if (index !== -1) {
            this.cards.splice(index, 1);
        }
    }

    size(): number {
        return this.cards.length;
    }

    clear(): void {
        this.cards = [];
    }

    clone(): Harbor {
        return new Harbor(this.cards.slice());
    }
}