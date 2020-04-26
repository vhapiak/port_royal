import { GameState } from "../gameState/GameState";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "./ResultCode";
import { ExecutionResult } from "./ExecutionResult";
import { Player } from "../gameState/Player";
import { PlayerActionsExecutor } from "./PlayerActionsExecutor";
import { GameActionsExecutor } from "./GameActionsExecutor";

export class GameEngine {

    state: GameState;

    constructor(state: GameState) {
        this.state = state;
    }

    validateAction(player: Player, action: PlayerAction): ResultCode {
        const gameState = this.state.clone();
        const clonePlayer = gameState.players[this.state.players.indexOf(player)];
        const gameActionsExecutor = new GameActionsExecutor(gameState);
        const playerActionsExecutor = new PlayerActionsExecutor(
            gameActionsExecutor, 
            gameState, 
            clonePlayer);
        return action.apply(playerActionsExecutor);
    }

    executeAction(player: Player, action: PlayerAction): ExecutionResult {
        const gameState = this.state.clone();
        const clonePlayer = gameState.players[this.state.players.indexOf(player)];
        const gameActionsExecutor = new GameActionsExecutor(gameState);
        const playerActionsExecutor = new PlayerActionsExecutor(
            gameActionsExecutor, 
            gameState, 
            clonePlayer);
        const result = action.apply(playerActionsExecutor);

        if (result === ResultCode.Ok) {
            this.state = gameState;
        }

        return new ExecutionResult(result, gameActionsExecutor.getEvents());
    }
}