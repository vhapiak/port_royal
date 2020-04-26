import { GameState } from "../gameState/GameState";
import { Card } from "../cards/Card";
import { Player } from "../gameState/Player";
import { GameEvent } from "../gameEvents/GameEvent";
import { CardDrawnEvent } from "../gameEvents/CardDrawnEvent";
import { GamePhase } from "../gameState/GamePhase";
import { GamePhaseChangedEvent } from "../gameEvents/GamePhaseChangedEvent";
import { CardPutIntoHarborEvent } from "../gameEvents/CardPutIntoHarborEvent";
import { DrawnCardDiscardedEvent } from "../gameEvents/DrawnCardDiscarded";
import { HarborDiscardedEvent } from "../gameEvents/HarborDiscardedEvent";
import { PossibleHiresChangedEvent } from "../gameEvents/PossibleHiresChangedEvent";
import { NumberOfHiresChangedEvent } from "../gameEvents/NumberOfHiresChangedEvent";

export class GameActionsExecutor {

    events: GameEvent[];
    gameState: GameState;

    constructor(gameState: GameState) {
        this.events = [];
        this.gameState = gameState;
    }

    drawCard(): Card {
        const card = this.gameState.cardPile.popCard();
        this.gameState.drawnCard = card;
        this.events.push(new CardDrawnEvent(card));
        return card;
    }

    changePhase(phase: GamePhase): void {
        this.gameState.phase = phase;
        this.events.push(new GamePhaseChangedEvent(phase));
    }

    putDrawnCardIntoHarbor(): void {
        this.gameState.harbor.addCard(this.gameState.drawnCard);
        this.events.push(new CardPutIntoHarborEvent(this.gameState.drawnCard));
        this.gameState.drawnCard = null;
    }

    discardDrawnCard(): void {
        this.gameState.cardPile.discardCard(this.gameState.drawnCard);
        this.events.push(new DrawnCardDiscardedEvent(this.gameState.drawnCard));
        this.gameState.drawnCard = null;
    }

    discardHarbor(): void {
        this.gameState.harbor.cards.forEach(card => {
            this.gameState.cardPile.discardCard(card);
        });
        this.gameState.harbor.clear();
        this.events.push(new HarborDiscardedEvent());
    }

    changePossibleHires(possibleHires: number): void {
        this.gameState.possibleHires = possibleHires;
        this.events.push(new PossibleHiresChangedEvent(possibleHires));
    }

    changeNumberOfHires(numberOfHires: number): void {
        this.gameState.numberOfHires = numberOfHires;
        this.events.push(new NumberOfHiresChangedEvent(numberOfHires));
    }

    giveCoins(player: Player, coins: number) {
        // @todo implement
    }

    changeActivePlayer(player: Player) {
        // @todo implement
    }

    changeTurnPlayer(player: Player) {
        // @todo implement
    }

    getEvents(): GameEvent[] {
        return this.events;
    }
}