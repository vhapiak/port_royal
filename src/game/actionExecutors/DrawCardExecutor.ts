import { GameActionExecutor } from "./GameActionExecutor";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { assert } from "../../common/assert";
import { GameEvent } from "../../gameEvents/GameEvent";

export class DrawCardExecutor implements GameActionExecutor {

    event: CardDrawnEvent;

    private shuffledCards: Card[];
    private prevDrawnCard: Card;

    constructor() {
        this.event = null;
        this.shuffledCards = null;
        this.prevDrawnCard = null;
    }

    execute(gameState: GameState): void {
        assert(this.event !== null);

        const pile = gameState.cardPile;
        if (pile.drawPile.length === 0) {
            if (pile.discardPile.length === 0) {
                return;
            }

            this.shuffledCards = pile.discardPile.slice();
            pile.drawPile = pile.discardPile;
            pile.discardPile = [];
        }
        let drawnCard = pile.drawPile.pop();
        this.event = new CardDrawnEvent(drawnCard);
        this.prevDrawnCard = gameState.drawnCard;
        gameState.drawnCard = drawnCard;
    }

    revert(gameState: GameState): void {
        assert(this.event === null);

        const pile = gameState.cardPile;
        pile.drawPile.push(this.event.card);
        if (this.shuffledCards) {
            gameState.cardPile.drawPile = [];
            gameState.cardPile.discardPile = this.shuffledCards;
        }
        gameState.drawnCard = this.prevDrawnCard;
        this.event = null;
    }

    getEvent(): GameEvent {
        return this.event;
    }

}