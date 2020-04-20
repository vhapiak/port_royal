import { Card } from "../cards/Card";

export class CardPile {
    drawPile: Card[];
    discardPile: Card[];

    constructor(cards: Card[]) {
        this.drawPile = [];
        this.discardPile = cards;
    }

    /**
     * @return null if there are no cards in a pile
     */
    popCard(): Card {
        if (this.drawPile.length == 0) {
            if (this.discardPile.length == 0) {
                return null;
            }
            this.drawPile = this.discardPile;
            this.discardPile = [];
            // @todo shuffle draw pile
        }
        return this.drawPile.pop();
    }

    discardCard(card: Card) {
        if (card) {
            this.discardPile.push(card);
        }
    }
}