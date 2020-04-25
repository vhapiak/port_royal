import { GameState } from "../../gameState/GameState";
import { Card } from "../../cards/Card";
import { GamePhase } from "../../gameState/GamePhase";
import { GameEvent } from "../../gameEvents/GameEvent";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarbor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { HarborDiscardedEvent } from "../../gameEvents/HarborDiscardedEvent";
import { Player } from "../../gameState/Player";
import { PersonCard } from "../../cards/PersonCard";

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

    discardHarbor(): void {
        this.gameState.harbor.cards.forEach(card => {
            this.gameState.cardPile.discardCard(card);
        });
        this.gameState.harbor.clear();
        this.events.push(new HarborDiscardedEvent());
    }

    startHiring(possibleHires: number): void {
        this.gameState.phase = GamePhase.Hiring;
        this.gameState.possibleHires = possibleHires;
        // @todo generate event about possible hires
        this.events.push(new GamePhaseChangedEvent(this.gameState.phase));
    }

    addCoins(player: Player, income: number): void {
        for (let i = 0; i < income; ++i) {
            const coin = this.gameState.cardPile.popCard();
            // @todo check for null
            player.addCoin(coin);
        }
        // @todo generate event
    }

    changeActivePlayer(player: Player): void {
        this.gameState.activePlayer = player;
        // @todo generate event
    }

    changeTurnPlayer(player: Player): void {
        this.gameState.turnPlayer = player;
        // @todo generate event
    }

    startDiscovering(): void {
        this.gameState.phase = GamePhase.Discovering;
        this.events.push(new GamePhaseChangedEvent(this.gameState.phase));
    }

    discardHarborCard(card: Card): void {
        this.gameState.harbor.removeCard(card);
        this.gameState.cardPile.discardCard(card);
        // @todo generate event
    }

    spendCoins(player: Player, coins: number): void {
        for (let i = 0; i < coins; ++i) {
            const coin = player.removeCoin();
            this.gameState.cardPile.discardCard(coin);
        }
        // @todo generate event
    }

    payCoins(source: Player, target: Player, coins: number): void {
        for (let i = 0; i < coins; ++i) {
            const coin = source.removeCoin();
            target.addCoin(coin);
        }
        // @todo generate event
    }

    hirePerson(player: Player, person: PersonCard): void {
        this.gameState.harbor.removeCard(person);
        player.addPerson(person);
        // @todo generate event
    }

    resetNumberOfHires() {
        this.gameState.numberOfHires = 0;
        // @todo generate event
    }

    increaseNumberOfHires(): void {
        this.gameState.numberOfHires++;
        // @todo generate event
    }

} 