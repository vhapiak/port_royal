import { GameActionsExecutor } from "../GameActionsExecutor";
import { GameState } from "../../gameState/GameState";
import { ResultCode } from "../ResultCode";
import { CaptainCard } from "../../cards/persons/CaptainCard";
import { CaptainBonusCalculator } from "./CaptainBonusCalculator";
import { RogueBonusCalculator } from "./RogueBonusCalculator";
import { RogueCard } from "../../cards/persons/RogueCard";

export function startActivePlayerHiring(executor: GameActionsExecutor, gameState: GameState): ResultCode {
    calcStartHiringPlayerBonuses(executor, gameState);
    executor.changeNumberOfHires(0);
    // @todo pass turn if player has no actions
    return ResultCode.Ok;
}

function calcStartHiringPlayerBonuses(executor: GameActionsExecutor, gameState: GameState): void {
    const size = gameState.harbor.cards.length;
    const activePlayer = gameState.activePlayer;
    if (size >= CaptainCard.THRESHOLD) {
        const captainBonusCalculator = new CaptainBonusCalculator(activePlayer.persons);
        executor.giveCoins(activePlayer, captainBonusCalculator.income);
    } else if (size <= RogueCard.THRESHOLD) {
        const rogueBonusCalculator = new RogueBonusCalculator(activePlayer.persons);
        executor.giveCoins(activePlayer, rogueBonusCalculator.income);
    }
}