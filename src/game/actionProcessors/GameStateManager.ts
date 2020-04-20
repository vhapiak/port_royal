import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { GamePhase } from "../../gameState/GamePhase";
import { GameEvent } from "../../gameEvents/GameEvent";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarbor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";

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
        // @todo assert this.gameState.drawnCard !== null
        this.gameState.phase = GamePhase.DiscardingShip;
        this.events.push(new GamePhaseChangedEvent(this.gameState.phase));
    }

    putDrawnCardIntoHarbor(): void {
        // @todo assert this.gameState.drawnCard !== null
        this.gameState.harbor.addCard(this.gameState.drawnCard);
        this.events.push(new CardPutIntoHarborEvent(this.gameState.drawnCard));
        this.gameState.drawnCard = null;
    }

    discardDrawnCard(): void {
        // @todo assert this.gameState.drawnCard !== null
        this.gameState.cardPile.discardCard(this.gameState.drawnCard);
        // @todo generate discard event
        this.gameState.drawnCard = null;
    }

    continueDiscovering(): void {
        if (this.gameState.phase !== GamePhase.Discovering) {
            this.gameState.phase = GamePhase.Discovering;
            this.events.push(new GamePhaseChangedEvent(this.gameState.phase));
        }
    }

} 