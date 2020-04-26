import { CardPile } from "./CardPile";
import { Harbor } from "./Harbor";
import { Player } from "./Player";
import { Card } from "../cards/Card";
import { GamePhase } from "./GamePhase";

export class GameState {
    phase: GamePhase;
    cardPile: CardPile;
    players: Player[];
    harbor: Harbor;

    drawnCard: Card;
    possibleHires: number;
    numberOfHires: number;
    turnPlayer: Player;
    activePlayer: Player;

    constructor(
        phase: GamePhase,
        cardPile: CardPile,
        players: Player[],
        harbor: Harbor,
        drawnCard: Card,
        possibleHires: number,
        numberOfHires: number,
        turnPlayer: Player,
        activePlayer: Player) {
            this.phase = phase;
            this.cardPile = cardPile;
            this.players = players; // @todo validate players number
            this.harbor = harbor;
            this.drawnCard = drawnCard;
            this.possibleHires = possibleHires;
            this.numberOfHires = numberOfHires;
            this.turnPlayer = turnPlayer;
            this.activePlayer = activePlayer;
    }

    clone(): GameState {
        const cardPile = this.cardPile.clone();
        const players = this.players.map(player => player.clone());
        const harbor = this.harbor.clone();

        const turnPlayer = this.players.indexOf(this.turnPlayer);
        const activePlayer = this.players.indexOf(this.activePlayer);

        return new GameState(
            this.phase, 
            cardPile, 
            players, 
            harbor, 
            this.drawnCard, 
            this.possibleHires, 
            this.numberOfHires, 
            players[turnPlayer], 
            players[activePlayer]);
    }
}