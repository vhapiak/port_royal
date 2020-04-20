import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";

export class HarborDiscardedEvent implements GameEvent {
    
    apply(visitor: GameEventVisitor): void {
        visitor.visitHarborDiscardedEvent(this);
    }
}