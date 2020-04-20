/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { ResultCode } from "../../game/ResultCode";
import { Button } from "./Button";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { DiscardShipAction } from "../../playerActions/DiscardShipAction";
import { PutShipIntoHarborAction } from "../../playerActions/PutShipIntoHarborAction";
import { GamePhase } from "../../gameState/GamePhase";

export class DiscardShipButtons extends GameEventVisitor {

    gameModel: GameModel;
    container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.gameModel = gameModel;
        this.container = scene.add.container(0, 0);

        const layerConfig = Config.mainLayer.verticalLayer;
        let discardButton = new Button(
            scene, 
            this.container, 
            layerConfig.x,
            layerConfig.firstButtonRow.y,
            'blue_button',
            'Discard ship');

        let putIntoHarborButton = new Button(
            scene, 
            this.container, 
            layerConfig.x,
            layerConfig.secondButtonRow.y,
            'brown_button',
            'Put into harbor');

        discardButton.onClick(DiscardShipButtons.prototype.discardShip, this);
        putIntoHarborButton.onClick(DiscardShipButtons.prototype.putIntoHarbor, this);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent): void {
        this.updateState();
    }

    private discardShip(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new DiscardShipAction());
        }
    }

    private putIntoHarbor(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new PutShipIntoHarborAction());
        }
    }

    private updateState(): void {
        if (this.gameModel.gameEngine.state.phase === GamePhase.DiscardingShip) {
            this.container.setVisible(true);
            if (this.isActive()) {
                this.container.setAlpha(1.0);
            } else {
                this.container.setAlpha(0.5);
            }
        } else {
            this.container.setVisible(false);
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new DiscardShipAction());
        return resultCode === ResultCode.Ok;
    }
}