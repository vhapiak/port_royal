import { Card } from "../cards/Card";

export class CardPile {
    drawPile: Card[];
    discardPile: Card[];

    constructor(drawPile: Card[], discardPile: Card[]) {
        this.drawPile = drawPile;
        this.discardPile = discardPile;
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

    clone(): CardPile {
        return new CardPile(this.drawPile.slice(), this.discardPile.slice());
    }
}