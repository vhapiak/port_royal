import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Player } from "../gameState/Player";

export class ActivePlayerChangedEvent implements GameEvent {

    player: Player

    constructor(player: Player) {
        this.player = player;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitActivePlayerChangedEvent(this);
    }
}