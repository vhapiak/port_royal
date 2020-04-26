import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Player } from "../gameState/Player";

export class TurnPlayerChangedEvent implements GameEvent {

    player: Player

    constructor(player: Player) {
        this.player = player;
    }

    apply(visitor: GameEventVisitor): void {
        // @todo call visit method
    }
}