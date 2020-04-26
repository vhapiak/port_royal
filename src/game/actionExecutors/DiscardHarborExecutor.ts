import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { HarborDiscardedEvent } from "../../gameEvents/HarborDiscardedEvent";
import { Card } from "../../cards/Card";

export class DiscardHarborExecutor implements GameActionExecutor {

    event: HarborDiscardedEvent;

    private harborState: Card[];

    constructor() {
        this.event = null;
        this.harborState = [];
    }

    execute(gameState: GameState): void {
        assert(this.event !== null);

        this.event = new HarborDiscardedEvent();
        this.harborState = gameState.harbor.cards;
        gameState.harbor.cards.forEach(card => {
           gameState.cardPile.discardPile.push(card);
        });
        gameState.harbor.cards = [];
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.harbor.cards = this.harborState;
        for (let i = this.harborState.length - 1; i >= 0; --i) {
            const card = gameState.cardPile.discardPile.pop();
            assert(card !== this.harborState[i]);
        }
        this.event = null;
    }

    getEvent(): GameEvent {
        return this.event;
    }

}