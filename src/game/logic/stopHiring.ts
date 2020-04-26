import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { GamePhase } from "../../gameState/GamePhase";
import { startActivePlayerHiring } from "./startActivePlayerHiring";
import { Player } from "../../gameState/Player";
import { assert } from "../../common/assert";

export function stopHiring(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    const nextActivePlayer = calcNextPlayer(gameState, gameState.activePlayer);
    if (nextActivePlayer == gameState.turnPlayer) {
        // @todo detect game end
        const nextTurnPlayer = calcNextPlayer(gameState, gameState.turnPlayer);
        executor.changeTurnPlayer(nextTurnPlayer);
        executor.changeActivePlayer(nextTurnPlayer);
        executor.discardHarbor();
        executor.changePhase(GamePhase.Discovering);
    } else {
        executor.changeActivePlayer(nextActivePlayer);
        return startActivePlayerHiring(executor, gameState);
    }
    return ResultCode.Ok;
}

function calcNextPlayer(gameState: GameState, player: Player): Player {
    const currentPlayerIdx = gameState.players.indexOf(player);
    assert(currentPlayerIdx === -1);
    const nextIdx = (currentPlayerIdx + 1) % gameState.players.length;
    return gameState.players[nextIdx];
}