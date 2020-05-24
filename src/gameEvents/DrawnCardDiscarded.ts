import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Card } from "../cards/Card";

export class DrawnCardDiscardedEvent implements GameEvent {

    card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitDrawnCardDiscardedEvent(this);
    }
}