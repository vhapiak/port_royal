import { GameState } from "../gameState/GameState";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "./ResultCode";
import { ExecutionResult } from "./ExecutionResult";
import { Player } from "../gameState/Player";
import { PlayerActionValidator } from "./actionProcessors/PlayerActionValidator";
import { GameStateManager } from "./actionProcessors/GameStateManager";
import { PlayerActionExecutor } from "./actionProcessors/PlayerActionExecutor";

export class GameEngine {

    state: GameState;

    constructor(state: GameState) {
        this.state = state;
    }

    validateAction(player: Player, action: PlayerAction): ResultCode {
        return this.validate(player, action);
    }

    executeAction(player: Player, action: PlayerAction): ExecutionResult {
        let validationResult = this.validate(player, action);
        if (validationResult != ResultCode.Ok) {
            return new ExecutionResult(validationResult);
        }

        let gameStateManager = new GameStateManager(this.state);
        let executor = new PlayerActionExecutor(gameStateManager, player);
        action.apply(executor);
        return new ExecutionResult(executor.result, gameStateManager.events);
    }

    private validate(player: Player, action: PlayerAction): ResultCode {
        if (player !== this.state.activePlayer) {
            return ResultCode.NotActivePlayer;
        }

        let validator = new PlayerActionValidator(this.state, player);
        action.apply(validator);
        return validator.result;
    }

}