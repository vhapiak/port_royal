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
import { CoinsGivenEvent } from "../gameEvents/CoinsGivenEvent";
import { ActivePlayerChangedEvent } from "../gameEvents/ActivePlayerChangedEvent";
import { TurnPlayerChangedEvent } from "../gameEvents/TurnPlayerChangedEvent";
import { HarborCardDiscardedEvent } from "../gameEvents/HarborCardDiscardedEvent";
import { CoinsSpentEvent } from "../gameEvents/CoinsSpentEvent";
import { FeePaidEvent } from "../gameEvents/FeePaidEvent";
import { PersonCard } from "../cards/PersonCard";
import { PersonHiredEvent } from "../gameEvents/PersonHiredEvent";

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
        let actualCoins = 0;
        for (let i = 0; i < coins; ++i) {
            const coin = this.gameState.cardPile.popCard();
            if (coin) {
                actualCoins++;
                player.addCoin(coin);
            }
        }
        this.events.push(new CoinsGivenEvent(player, actualCoins));
    }

    changeActivePlayer(player: Player) {
        this.gameState.activePlayer = player;
        this.events.push(new ActivePlayerChangedEvent(player));
    }

    changeTurnPlayer(player: Player) {
        this.gameState.turnPlayer = player;
        this.events.push(new TurnPlayerChangedEvent(player));
    }

    discardHarborCard(card: Card) {
        this.gameState.harbor.removeCard(card);
        this.gameState.cardPile.discardCard(card);
        this.events.push(new HarborCardDiscardedEvent(card));
    }

    spendCoins(player: Player, coins: number): void {
        for (let i = 0; i < coins; ++i) {
            const coin = player.removeCoin();
            this.gameState.cardPile.discardCard(coin);
        }
        this.events.push(new CoinsSpentEvent(player, coins));
    }

    payFee(source: Player, target: Player, fee: number): void {
        for (let i = 0; i < fee; ++i) {
            const coin = source.removeCoin();
            target.addCoin(coin);
        }
        this.events.push(new FeePaidEvent(source, target, fee));
    }

    hirePerson(player: Player, person: PersonCard): void {
        this.gameState.harbor.removeCard(person);
        player.addPerson(person);
        this.events.push(new PersonHiredEvent(player, person));
    }

    getEvents(): GameEvent[] {
        return this.events;
    }
}