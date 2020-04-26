import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Player } from "../gameState/Player";

export class FeePaidEvent implements GameEvent {
    
    source: Player
    target: Player
    fee: number;

    constructor(source: Player, target: Player, fee: number) {
        this.source = source;
        this.target = target;
        this.fee = fee;
    }

    apply(visitor: GameEventVisitor): void {
        // @todo call visit method
    }
}