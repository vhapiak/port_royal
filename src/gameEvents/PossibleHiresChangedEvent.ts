import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";

export class PossibleHiresChangedEvent implements GameEvent {

    possibleHires: number;

    constructor(possibleHires: number) {
        this.possibleHires = possibleHires;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitPossibleHiresChangedEvent(this);
    }
}