import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { PossibleHiresChangedEvent } from "../../gameEvents/PossibleHiresChangedEvent";

export class ChangePossibleHiresExecutor implements GameActionExecutor {

    possibleHires: number;
    event: PossibleHiresChangedEvent;

    private prevPossibleHires: number;

    constructor(possibleHires: number) {
        this.possibleHires = possibleHires;
        this.event = null;
        this.prevPossibleHires = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null);

        this.prevPossibleHires = gameState.possibleHires;
        gameState.possibleHires = this.possibleHires;
        this.event = new PossibleHiresChangedEvent(this.possibleHires);
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.possibleHires = this.prevPossibleHires;
        this.event = null;
    }
    
    getEvent(): GameEvent {
        return this.event;
    }

}