import { CardVisitor } from "../../cards/CardVisitor";
import { Card } from "../../cards/Card";
import { PiratCard } from "../../cards/persons/PiratCard";
import { ShipCard } from "../../cards/ShipCard";
import { ShipColor } from "../../cards/ShipColor";

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

    visitShip(card: ShipCard): void {
        const colorMask = (1 << card.color);
        if (this.presentColorsMask & colorMask) {
            this.hasSameShips = true;
        } else {
            this.presentColorsMask |= colorMask;
        }
    }

}