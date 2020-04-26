import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { DrawnCardDiscardedEvent } from "../../gameEvents/DrawnCardDiscarded";

export class DiscardDrawnCardExecutor implements GameActionExecutor {

    event: DrawnCardDiscardedEvent;

    constructor() {
        this.event = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null || gameState.drawnCard === null);

        this.event = new DrawnCardDiscardedEvent(gameState.drawnCard);
        gameState.cardPile.discardPile.push(gameState.drawnCard);
        gameState.drawnCard = null;
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.drawnCard = this.event.card;
        const card = gameState.cardPile.discardPile.pop();
        assert(card !== this.event.card);
        this.event = null;
    }

    getEvent(): GameEvent {
        return this.event;
    }

}