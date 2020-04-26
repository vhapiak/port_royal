import { GameActionsExecutor } from "../actionExecutors/GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { assert } from "../../common/assert";
import { GamePhase } from "../../gameState/GamePhase";

export function discardDrawnCard(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    assert(gameState.drawnCard === null);
    executor.discardDrawnCard();
    executor.changePhase(GamePhase.Discovering);
    return ResultCode.Ok;
}