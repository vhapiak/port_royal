import { Card } from "../cards/Card";
import { Shuffler } from "../common/Shuffler";

export class CardPile {
    drawPile: Card[];
    discardPile: Card[];
    shuffer: Shuffler;

    constructor(drawPile: Card[], discardPile: Card[], shuffler: Shuffler) {
        this.drawPile = drawPile;
        this.discardPile = discardPile;
        this.shuffer = shuffler;
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
            this.shuffer.shuffle(this.drawPile);
        }
        return this.drawPile.pop();
    }

    discardCard(card: Card) {
        if (card) {
            this.discardPile.push(card);
        }
    }

    clone(): CardPile {
        return new CardPile(this.drawPile.slice(), this.discardPile.slice(), this.shuffer);
    }
}