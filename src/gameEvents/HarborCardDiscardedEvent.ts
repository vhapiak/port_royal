import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Card } from "../cards/Card";

export class HarborCardDiscardedEvent implements GameEvent {
    
    card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    apply(visitor: GameEventVisitor): void {
        // @todo call visitor method
    }
}