import { GameState } from "../gameState/GameState";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "./ResultCode";
import { ExecutionResult } from "./ExecutionResult";
import { Player } from "../gameState/Player";
import { PlayerActionsExecutor } from "./PlayerActionsExecutor";
import { GameActionsExecutor } from "./actionExecutors/GameActionsExecutor";

export class GameEngine {

    state: GameState;

    constructor(state: GameState) {
        this.state = state;
    }

    validateAction(player: Player, action: PlayerAction): ResultCode {
        const gameActionsExecutor = new GameActionsExecutor(this.state);
        const result = this.execute(gameActionsExecutor, player, action);
        gameActionsExecutor.revert();
        return result;
    }

    executeAction(player: Player, action: PlayerAction): ExecutionResult {
        const gameActionsExecutor = new GameActionsExecutor(this.state);
        const result = this.execute(gameActionsExecutor, player, action);

        if (result !== ResultCode.Ok) {
            gameActionsExecutor.revert();
        }

        return new ExecutionResult(result, gameActionsExecutor.getEvents());
    }

    private execute(executor: GameActionsExecutor, player: Player, action: PlayerAction): ResultCode {
        const playerActionsExecutor = new PlayerActionsExecutor(executor, this.state, player);
        return action.apply(playerActionsExecutor);
    }
}