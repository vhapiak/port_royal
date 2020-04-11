import { PlayerActionVisitor } from "./PlayerActionVisitor";

export interface PlayerAction {
    apply(visitor: PlayerActionVisitor): void;
}