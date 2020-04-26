import { GameActionsExecutor } from "../actionExecutors/GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { SameShipsInHarborChecker } from "./SameShipsInHarborChecker";
import { GamePhase } from "../../gameState/GamePhase";
import { assert } from "../../common/assert";

export function putDrawnCardIntoHarbor(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    assert(gameState.drawnCard === null);
    executor.putDrawnCardIntoHarbor();

    let sameShipsChecker = new SameShipsInHarborChecker(gameState.harbor.cards);
    if (sameShipsChecker.hasSameShips) {
        executor.discardHarbor();
        executor.changePhase(GamePhase.Discovering);
        // @todo this.startHiring();
    } else if (gameState.phase !== GamePhase.Discovering) {
        executor.changePhase(GamePhase.Discovering);
    }
    return ResultCode.Ok;
}