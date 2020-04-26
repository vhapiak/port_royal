import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { ShipStrengthChecker } from "./checkers/ShipStrengthChecker";
import { GamePhase } from "../../gameState/GamePhase";
import { putDrawnCardIntoHarbor } from "./putCardIntoHarbor";

export function drawCard(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    const drawnCard = executor.drawCard();
    if (!drawnCard) {
        return ResultCode.NotEnoughCards;
    }

    let shipStrengthChecker = new ShipStrengthChecker(gameState.activePlayer);
    drawnCard.apply(shipStrengthChecker);
    if (shipStrengthChecker.isCardDiscardable) {
        executor.changePhase(GamePhase.DiscardingShip);
    } else {
        return putDrawnCardIntoHarbor(executor, gameState);
    }
    return ResultCode.Ok;
}