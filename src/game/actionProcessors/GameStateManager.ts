import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { GamePhase } from "../../gameState/GamePhase";

export class GameStateManager {

    gameState: GameState

    constructor(gameState: GameState) {
        this.gameState = gameState;
    }

    drawCard(): Card {
        let card = this.gameState.cardPile.popCard();
        this.gameState.drawnCard = card;
        // @todo make event
        return card;
    }

    waitDiscardDecision(): void {
        this.gameState.phase = GamePhase.DiscardingShip;
        // @todo make event
    }

    putDrawnCardIntoHarbor(): void {
        this.gameState.harbor.addCard(this.gameState.drawnCard);
        this.gameState.drawnCard = null;
        // @todo make event
    }

} 