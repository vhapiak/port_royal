import { GameState } from "../gameState/GameState";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "./ResultCode";
import { ExecutionResult } from "./ExecutionResult";
import { Player } from "../gameState/Player";
import { PlayerActionValidator } from "./actionProcessors/PlayerActionValidator";
import { GameStateManager } from "./actionProcessors/GameStateManager";
import { PlayerActionExecutor } from "./actionProcessors/PlayerActionExecutor";

class GameEngine {

    private state: GameState;

    validateAction(playerIdx: number, action: PlayerAction): ResultCode {
        let player = this.getPlayerObject(playerIdx);
        return this.validate(player, action);
    }

    executeAction(playerIdx: number, action: PlayerAction): ExecutionResult {
        let player = this.getPlayerObject(playerIdx);
        return this.execute(player, action);
    }

    private getPlayerObject(playerIdx: number): Player {
        // @todo validate player index
        return this.state.players[playerIdx];
    }

    private validate(player: Player, action: PlayerAction): ResultCode {
        if (player !== this.state.activePlayer) {
            return ResultCode.NotActivePlayer;
        }

        let validator = new PlayerActionValidator(this.state, player);
        action.apply(validator);
        return validator.result;
    }

    private execute(player: Player, action: PlayerAction): ExecutionResult {
        let validationResult = this.validate(player, action);
        if (validationResult != ResultCode.Ok) {
            return new ExecutionResult(validationResult);
        }

        let gameStateManager = new GameStateManager(this.state);
        let executor = new PlayerActionExecutor(gameStateManager, player);
        action.apply(executor);
        return new ExecutionResult(executor.result);
    }

}