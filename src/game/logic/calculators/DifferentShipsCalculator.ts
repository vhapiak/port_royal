import { CardVisitor } from "../../../cards/CardVisitor";
import { Card } from "../../../cards/Card";
import { ShipCard } from "../../../cards/ShipCard";

export class DifferentShipsCalculator extends CardVisitor {

    number: number;
    mask: number;

    constructor(cards: Card[]) {
        super();

        this.number = 0;
        this.mask;
        for (let card of cards) {
            card.apply(this);
        }
    }

    visitShipCard(card: ShipCard): void {
        const colorMask = (1 << card.color);
        if ((this.mask & colorMask) === colorMask) {
            this.number++;
        }
    }

}