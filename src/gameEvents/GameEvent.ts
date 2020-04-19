import { GameEventVisitor } from "./GameEventVisitor";

export interface GameEvent {
    apply(visitor: GameEventVisitor): void;
}