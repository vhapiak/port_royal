import { Player } from "../../gameState/Player";
import { PlayerActionVisitor } from "../../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../ResultCode";
import { GameState } from "../../gameState/GameState";
import { GamePhase } from "../../gameState/GamePhase";
import { DiscardShipAction } from "../../playerActions/DiscardShipAction";
import { PutShipIntoHarborAction } from "../../playerActions/PutShipIntoHarborAction";
import { StopDiscoveringAction } from "../../playerActions/StopDiscoveringAction";
import { StopHiringAction } from "../../playerActions/StopHiringAction";

export class PlayerActionValidator extends PlayerActionVisitor {

    private gameState: GameState;
    private sourcePlayer: Player;
    
    result: ResultCode;

    constructor(gameState: GameState, sourcePlayer: Player) {
        super();

        this.gameState = gameState;
        this.sourcePlayer = sourcePlayer;
        this.result = ResultCode.UnknownError;
    }

    visitDrawCardAction(action: DrawCardAction): void {
        this.result = this.checkDrawCardPhase();
    }

    visitStopDiscoveringAction(action: StopDiscoveringAction): void {
        this.result = this.checkDrawCardPhase();
    }

    visitDiscardShipAction(action: DiscardShipAction): void {
        this.result = this.checkDiscardPhase();
    }

    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): void {
        this.result = this.checkDiscardPhase();
    }

    visitStopHiringAction(action: StopHiringAction): void {
        this.result = this.checkHiringPhase();
    }

    private checkDrawCardPhase(): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        return ResultCode.Ok;
    }

    private checkDiscardPhase(): ResultCode {
        if (this.gameState.phase !== GamePhase.DiscardingShip) {
            return ResultCode.WrongPhase;
        }
        return ResultCode.Ok;
    }

    private checkHiringPhase(): ResultCode {
        if (this.gameState.phase !== GamePhase.Hiring) {
            return ResultCode.WrongPhase;
        }
        return ResultCode.Ok;
    }

}