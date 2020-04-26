import { GameActionExecutor } from "./GameActionExecutor";
import { GameState } from "../../gameState/GameState";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarborEvent";

export class PutDrawnCardIntoHarborExecutor implements GameActionExecutor {

    event: CardPutIntoHarborEvent;

    constructor() {
        this.event = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null || gameState.drawnCard === null);

        this.event = new CardPutIntoHarborEvent(gameState.drawnCard);
        gameState.harbor.cards.push(gameState.drawnCard);
        gameState.drawnCard = null;
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        gameState.drawnCard = this.event.card;
        const card = gameState.harbor.cards.pop();
        assert(card !== this.event.card);
        this.event = null;
    }

    getEvent(): GameEvent {
        return this.event;
    }

}