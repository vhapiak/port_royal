import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { GamePhase } from "../../gameState/GamePhase";

export function startGame(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    const startCoins = 3;
    gameState.players.forEach(player => executor.giveCoins(player, startCoins));
    executor.changePhase(GamePhase.Discovering);
    return ResultCode.Ok;
}