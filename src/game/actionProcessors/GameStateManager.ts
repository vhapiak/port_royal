import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { GamePhase } from "../../gameState/GamePhase";
import { GameEvent } from "../../gameEvents/GameEvent";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarbor";

export class GameStateManager {

    gameState: GameState;
    events: GameEvent[];

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.events = [];
    }

    drawCard(): Card {
        let card = this.gameState.cardPile.popCard();
        this.gameState.drawnCard = card;
        this.events.push(new CardDrawnEvent(card));
        return card;
    }

    waitDiscardDecision(): void {
        this.gameState.phase = GamePhase.DiscardingShip;
        // @todo make event
    }

    putDrawnCardIntoHarbor(): void {
        this.gameState.harbor.addCard(this.gameState.drawnCard);
        this.events.push(new CardPutIntoHarborEvent(this.gameState.drawnCard));
        this.gameState.drawnCard = null;
    }

} 