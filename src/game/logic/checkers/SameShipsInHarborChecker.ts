import { CardVisitor } from "../../../cards/CardVisitor";
import { Card } from "../../../cards/Card";
import { ShipCard } from "../../../cards/ShipCard";

export class SameShipsInHarborChecker extends CardVisitor {

    hasSameShips: boolean;

    private presentTypesMask: number;

    constructor(cards: Card[]) {
        super();

        this.hasSameShips = false;
        this.presentTypesMask = 0;
        for (let card of cards) {
            card.apply(this);
        }
    }

    visitShipCard(card: ShipCard): void {
        const typeMask = (1 << card.type);
        if (this.presentTypesMask & typeMask) {
            this.hasSameShips = true;
        } else {
            this.presentTypesMask |= typeMask;
        }
    }

}