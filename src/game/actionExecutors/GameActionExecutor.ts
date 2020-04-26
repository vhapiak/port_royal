import { GameState } from "../../gameState/GameState";
import { GameEvent } from "../../gameEvents/GameEvent";

export interface GameActionExecutor {
    execute(gameState: GameState): void;
    revert(gameState: GameState): void;
    getEvent(): GameEvent;
}