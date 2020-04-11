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
    activePlayer: Player;
}