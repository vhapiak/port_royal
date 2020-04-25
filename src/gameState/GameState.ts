import { CardPile } from "./CardPile";
import { Harbor } from "./Harbor";
import { Player } from "./Player";
import { Card } from "../cards/Card";
import { GamePhase } from "./GamePhase";

export class GameState {
    phase: GamePhase;
    cardPile: CardPile;
    drawnCard: Card;
    harbor: Harbor;
    players: Player[];

    possibleHires: number;
    numberOfHires: number;
    turnPlayer: Player;
    activePlayer: Player;

    constructor(cardPile: CardPile, players: Player[]) {
        this.phase = GamePhase.Discovering;
        this.cardPile = cardPile;
        this.drawnCard = null;
        this.harbor = new Harbor();
        this.players = players; // @todo validate players number
        this.activePlayer = players[0]; 
        this.turnPlayer = this.activePlayer;
    }
}