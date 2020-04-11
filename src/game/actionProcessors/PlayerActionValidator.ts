import { Player } from "../../gameState/Player";
import { PlayerActionVisitor } from "../../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../ResultCode";
import { GameState } from "../../gameState/GameState";
import { GamePhase } from "../../gameState/GamePhase";

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
        this.result = this.checkDrawCardAction(action);
    }

    private checkDrawCardAction(action: DrawCardAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        return ResultCode.Ok;
    }

}