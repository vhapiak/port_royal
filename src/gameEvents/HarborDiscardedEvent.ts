import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";

export class HarborDiscardedEvent implements GameEvent {

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitHarborDiscardedEvent(this);
    }
}