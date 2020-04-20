import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { GamePhase } from "../gameState/GamePhase";

export class GamePhaseChangedEvent implements GameEvent {
    
    phase: GamePhase

    constructor(phase: GamePhase) {
        this.phase = phase;
    }

    apply(visitor: GameEventVisitor): void {
        visitor.visitGamePhaseChangedEvent(this);
    }
}