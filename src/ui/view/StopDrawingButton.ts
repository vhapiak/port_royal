/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { ResultCode } from "../../game/ResultCode";
import { Button } from "./Button";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { GamePhase } from "../../gameState/GamePhase";
import { StopDiscoveringAction } from "../../playerActions/StopDiscoveringAction";

export class StopDrawingButton extends GameEventVisitor {

    gameModel: GameModel;
    container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.gameModel = gameModel;
        this.container = scene.add.container(0, 0);

        const layerConfig = Config.mainLayer.verticalLayer;
        let button = new Button(
            scene, 
            this.container, 
            layerConfig.x,
            layerConfig.firstButtonRow.y,
            'blue_button',
            'Stop drawing');

        button.onClick(StopDrawingButton.prototype.stopDrawing, this);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent): void {
        this.updateState();
    }

    private stopDrawing(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new StopDiscoveringAction());
        }
    }

    private updateState(): void {
        if (this.gameModel.gameEngine.state.phase === GamePhase.Discovering) {
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
        let resultCode = this.gameModel.validateAction(new StopDiscoveringAction());
        return resultCode === ResultCode.Ok;
    }
}