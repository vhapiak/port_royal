import { Player } from "../../gameState/Player";
import { PlayerActionVisitor } from "../../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../ResultCode";
import { GameStateManager } from "./GameStateManager";
import { ShipStrengthChecker } from "./ShipStrengthChecker";

export class PlayerActionExecutor extends PlayerActionVisitor {

    private gameStateManager: GameStateManager;
    private sourcePlayer: Player;
    
    result: ResultCode;

    constructor(gameStateManager: GameStateManager, sourcePlayer: Player) {
        super();

        this.gameStateManager = gameStateManager;
        this.sourcePlayer = sourcePlayer;
        this.result = ResultCode.UnknownError;
    }

    visitDrawCardAction(action: DrawCardAction): void {
        this.result = this.executeDrawCardAction(action);
    }

    private executeDrawCardAction(action: DrawCardAction): ResultCode {
        let manager = this.gameStateManager;

        let drawnCard = manager.drawCard();
        
        let shipStrengthChecker = new ShipStrengthChecker(this.sourcePlayer);
        drawnCard.apply(shipStrengthChecker);
        if (shipStrengthChecker.isCardDiscardable) {
            manager.waitDiscardDecision();
        } else {
            manager.putDrawnCardIntoHarbor();
            // @todo check identical ship colors in harbor 
        }
        return ResultCode.Ok;
    }

}