import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";

export class PossibleHiresChangedEvent implements GameEvent {
    
    possibleHires: number;

    constructor(possibleHires: number) {
        this.possibleHires = possibleHires;
    }

    apply(visitor: GameEventVisitor): void {
        visitor.visitPossibleHiresChangedEvent(this);
    }
}