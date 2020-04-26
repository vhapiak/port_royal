import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { HireBonusCalculator } from "./HireBonusCalculator";
import { Card } from "../../cards/Card";
import { HireCardActionExecutor } from "./HireCardActionExecutor";

export function hireCard(card: Card, executor: GameActionsExecutor, gameState: GameState): ResultCode {
    if (gameState.harbor.cards.indexOf(card) < 0) {
        return ResultCode.NoSuchCardInHarbor;
    }

    const activePlayer = gameState.activePlayer;
    const turnPlayer = gameState.turnPlayer;

    const possibleHires = (turnPlayer == activePlayer) ? gameState.possibleHires : 1;
    const hiresBonus = new HireBonusCalculator(activePlayer.persons);

    if (gameState.numberOfHires >= possibleHires + hiresBonus.bonus) {
        return ResultCode.ExceedNumberOfHires;
    }

    let actionExecutor = new HireCardActionExecutor(executor);
    card.apply(actionExecutor);

    if (actionExecutor.result !== ResultCode.Ok) {
        return actionExecutor.result;
    }

    if (turnPlayer !== activePlayer) {
        if (activePlayer.coins.length === 0) {
            return ResultCode.NotEnoughCoins;
        }
        const hireFee = 1;
        executor.payFee(activePlayer, turnPlayer, hireFee);
    }
    executor.changeNumberOfHires(gameState.numberOfHires + 1);
    // @todo pass turn if player has no actions

    return ResultCode.Ok;
}