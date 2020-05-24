import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Player } from "../gameState/Player";

export class CoinsSpentEvent implements GameEvent {

    player: Player
    coins: number;

    constructor(player: Player, coins: number) {
        this.player = player;
        this.coins = coins;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitCoinsSpentEvent(this);
    }
}