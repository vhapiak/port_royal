import { Player } from "../../gameState/Player";
import { PlayerActionVisitor } from "../../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../ResultCode";
import { GameStateManager } from "./GameStateManager";
import { ShipStrengthChecker } from "./ShipStrengthChecker";
import { DiscardShipAction } from "../../playerActions/DiscardShipAction";
import { PutShipIntoHarborAction } from "../../playerActions/PutShipIntoHarborAction";

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

    visitDiscardShipAction(action: DiscardShipAction): void {
        this.result = this.executeDiscardShipAction();
    }

    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): void {
        this.result = this.executePutShipIntoHarborAction();
    }

    private executeDrawCardAction(action: DrawCardAction): ResultCode {
        let manager = this.gameStateManager;

        let drawnCard = manager.drawCard();
        // @todo check that card isn't null
        
        let shipStrengthChecker = new ShipStrengthChecker(this.sourcePlayer);
        drawnCard.apply(shipStrengthChecker);
        if (shipStrengthChecker.isCardDiscardable) {
            manager.waitDiscardDecision();
        } else {
            manager.putDrawnCardIntoHarbor();
            manager.continueDiscovering();
            // @todo check identical ship colors in harbor 
        }
        return ResultCode.Ok;
    }

    private executeDiscardShipAction() {
        let manager = this.gameStateManager;
        manager.discardDrawnCard();
        manager.continueDiscovering();
        return ResultCode.Ok;
    }

    private executePutShipIntoHarborAction() {
        let manager = this.gameStateManager;
        manager.putDrawnCardIntoHarbor();
        manager.continueDiscovering();
        // @todo check identical ship colors in harbor 
        return ResultCode.Ok;
    }

}