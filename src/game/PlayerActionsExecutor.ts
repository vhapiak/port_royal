import { Player } from "../gameState/Player";
import { PlayerActionVisitor } from "../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../playerActions/DrawCardAction";
import { ResultCode } from "./ResultCode";
import { GameActionsExecutor } from "./GameActionsExecutor";
import { GameState } from "../gameState/GameState";
import { GamePhase } from "../gameState/GamePhase";
import { drawCard } from "./logic/drawCard";
import { putDrawnCardIntoHarbor } from "./logic/putCardIntoHarbor";
import { PutShipIntoHarborAction } from "../playerActions/PutShipIntoHarborAction";
import { DiscardShipAction } from "../playerActions/DiscardShipAction";
import { discardDrawnCard } from "./logic/discardDrawnCard";
import { StopDiscoveringAction } from "../playerActions/StopDiscoveringAction";
import { startHiring } from "./logic/startHiring";
import { StopHiringAction } from "../playerActions/StopHiringAction";
import { stopHiring } from "./logic/stopHiring";
import { HireCardAction } from "../playerActions/HireCardAction";
import { hireCard } from "./logic/hireCard";

export class PlayerActionsExecutor extends PlayerActionVisitor<ResultCode> {

    private executor: GameActionsExecutor;
    private gameState: GameState;
    private sourcePlayer: Player;

    constructor(executor: GameActionsExecutor, gameState: GameState, sourcePlayer: Player) {
        super(ResultCode.UnknownError);

        this.executor = executor;
        this.gameState = gameState;
        this.sourcePlayer = sourcePlayer;
    }

    visitDrawCardAction(action: DrawCardAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return drawCard(this.executor, this.gameState);
    }

    visitStopDiscoveringAction(action: StopDiscoveringAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return startHiring(this.executor, this.gameState);
    }

    visitDiscardShipAction(action: DiscardShipAction): ResultCode {
        if (this.gameState.phase !== GamePhase.DiscardingShip) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return discardDrawnCard(this.executor, this.gameState);
    }

    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): ResultCode {
        if (this.gameState.phase !== GamePhase.DiscardingShip) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return putDrawnCardIntoHarbor(this.executor, this.gameState);
    }

    visitStopHiringAction(action: StopHiringAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Hiring) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return stopHiring(this.executor, this.gameState);
    }

    visitHireCardAction(action: HireCardAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Hiring) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return hireCard(action.card, this.executor, this.gameState);
    }

}