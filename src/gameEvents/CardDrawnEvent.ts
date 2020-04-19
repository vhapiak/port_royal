import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Card } from "../cards/Card";

export class CardDrawnEvent implements GameEvent {
    
    card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    apply(visitor: GameEventVisitor): void {
        visitor.visitCardDrawnEvent(this);
    }
}