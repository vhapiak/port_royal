import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";

export class NumberOfHiresChangedEvent implements GameEvent {

    numberOfHires: number;

    constructor(numberOfHires: number) {
        this.numberOfHires = numberOfHires;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitNumberOfHiresChangedEvent(this);
    }
}