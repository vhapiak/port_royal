import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { SameShipsInHarborChecker } from "./checkers/SameShipsInHarborChecker";
import { GamePhase } from "../../gameState/GamePhase";
import { assert } from "../../common/assert";
import { startHiring } from "./startHiring";
import { HarborEnteringProcessor } from "./HarborEnteringProcessor";

export function putDrawnCardIntoHarbor(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    assert(gameState.drawnCard === null);
    const card = executor.putDrawnCardIntoHarbor();

    const harborEnteringProcessor = new HarborEnteringProcessor(executor, gameState);
    card.apply(harborEnteringProcessor);

    const sameShipsChecker = new SameShipsInHarborChecker(gameState.harbor.cards);
    if (sameShipsChecker.hasSameShips) {
        executor.discardHarbor();
        return startHiring(executor, gameState);
    } else if (gameState.phase !== GamePhase.Discovering) {
        executor.changePhase(GamePhase.Discovering);
    }
    return ResultCode.Ok;
}