/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { ResultCode } from "../../game/ResultCode";
import { Button } from "./Button";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { GamePhase } from "../../gameState/GamePhase";
import { StopHiringAction } from "../../playerActions/StopHiringAction";

export class StopHiringButton extends GameEventVisitor {

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
            'End turn');

        button.onClick(StopHiringButton.prototype.stopHiring, this);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent): void {
        this.updateState();
    }

    private stopHiring(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new StopHiringAction());
        }
    }

    private updateState(): void {
        if (this.gameModel.gameEngine.state.phase === GamePhase.Hiring) {
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
        let resultCode = this.gameModel.validateAction(new StopHiringAction());
        return resultCode === ResultCode.Ok;
    }
}