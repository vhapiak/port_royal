import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { NumberOfHiresChangedEvent } from "../../gameEvents/NumberOfHiresChangedEvent";

export class ChangeNumberOfHiresExecutor implements GameActionExecutor {

    numberOfHires: number;
    event: NumberOfHiresChangedEvent;

    private prevNumberOfHires: number;

    constructor(numberOfHires: number) {
        this.numberOfHires = numberOfHires;
        this.event = null;
        this.prevNumberOfHires = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null);

        this.prevNumberOfHires = gameState.numberOfHires;
        gameState.numberOfHires = this.numberOfHires;
        this.event = new NumberOfHiresChangedEvent(this.numberOfHires);
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.numberOfHires = this.prevNumberOfHires;
        this.event = null;
    }
    
    getEvent(): GameEvent {
        return this.event;
    }

}