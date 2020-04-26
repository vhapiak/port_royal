import { GameActionsExecutor } from "../actionExecutors/GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { DifferentShipsCalculator } from "./DifferentShipsCalculator";
import { GamePhase } from "../../gameState/GamePhase";
import { startActivePlayerHiring } from "./startActivePlayerHiring";

export function startHiring(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    const differentShipsCalculator = new DifferentShipsCalculator(gameState.harbor.cards);
    const possibleHires = calcPossibleHires(differentShipsCalculator.number);
    executor.changePhase(GamePhase.Hiring);
    executor.changePossibleHires(possibleHires);
    return startActivePlayerHiring(executor, gameState);
}

function calcPossibleHires(differentShips: number): number {
    if (differentShips >= 5) {
        return 3;
    }
    if (differentShips == 4) {
        return 2;
    }
    return 1;
}