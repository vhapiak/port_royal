import { PlayerActionVisitor } from "./PlayerActionVisitor";

export interface PlayerAction {
    apply<Result>(visitor: PlayerActionVisitor<Result>): Result;
}