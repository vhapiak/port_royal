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
        const typeMask = (1 << card.type);
        if ((this.mask & typeMask) === typeMask) {
            this.number++;
        }
    }

}