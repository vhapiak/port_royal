import { CardVisitor } from "../../cards/CardVisitor";
import { Card } from "../../cards/Card";
import { ShipCard } from "../../cards/ShipCard";

export class SameShipsInHarborChecker extends CardVisitor {

    hasSameShips: boolean;

    private presentColorsMask: number;

    constructor(cards: Card[]) {
        super();

        this.hasSameShips = false;
        this.presentColorsMask = 0;
        for (let card of cards) {
            card.apply(this);
        }
    }

    visitShipCard(card: ShipCard): void {
        const colorMask = (1 << card.color);
        if (this.presentColorsMask & colorMask) {
            this.hasSameShips = true;
        } else {
            this.presentColorsMask |= colorMask;
        }
    }

}