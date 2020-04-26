import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { GameActionExecutor } from "./GameActionExecutor";
import { DrawCardExecutor } from "./DrawCardExecutor";
import { GameEvent } from "../../gameEvents/GameEvent";
import { GamePhase } from "../../gameState/GamePhase";
import { ChangePhaseExecutor } from "./ChangePhaseExecutor";
import { PutDrawnCardIntoHarborExecutor } from "./PutDrawnCardIntoHarborExecutor";
import { DiscardHarborExecutor } from "./DiscardHarborExecutor";
import { DiscardDrawnCardExecutor } from "./DiscardDrawnCardExecutor";

export class GameActionsExecutor {

    executors: GameActionExecutor[];
    gameState: GameState;

    constructor(gameState: GameState) {
        this.executors = [];
        this.gameState = gameState;
    }

    drawCard(): Card {
        const executor = new DrawCardExecutor();
        this.execute(executor);
        return executor.event.card;
    }

    changePhase(phase: GamePhase): void {
        this.execute(new ChangePhaseExecutor(phase));
    }

    putDrawnCardIntoHarbor(): void {
        this.execute(new PutDrawnCardIntoHarborExecutor());
    }

    discardDrawnCard(): void {
        this.execute(new DiscardDrawnCardExecutor());
    }

    discardHarbor(): void {
        this.execute(new DiscardHarborExecutor());
    }

    revert() {
        for (let i = this.executors.length - 1; i >= 0; --i) {
            this.executors[i].revert(this.gameState);
        }
    }

    getEvents(): GameEvent[] {
        const result: GameEvent[] = [];
        for (let executor of this.executors) {
            const event = executor.getEvent();
            if (event) {
                result.push(event);
            }
        }
        return result;
    }

    private execute(executor: GameActionExecutor) {
        executor.execute(this.gameState);
        this.executors.push(executor);
    }
}