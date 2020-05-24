import { GameEventVisitor } from "./GameEventVisitor";

export interface GameEvent {
    apply<Result = void>(visitor: GameEventVisitor<Result>): Result;
}