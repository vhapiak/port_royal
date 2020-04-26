import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { GamePhase } from "../../gameState/GamePhase";

export class ChangePhaseExecutor implements GameActionExecutor {

    phase: GamePhase;
    event: GamePhaseChangedEvent;

    private prevPhase: GamePhase;

    constructor(phase: GamePhase) {
        this.phase = phase;
        this.event = null;
        this.prevPhase = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null);

        this.prevPhase = gameState.phase;
        gameState.phase = this.phase;
        this.event = new GamePhaseChangedEvent(this.phase);
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.phase = this.prevPhase;
        this.event = null;
    }
    
    getEvent(): GameEvent {
        return this.event;
    }

}