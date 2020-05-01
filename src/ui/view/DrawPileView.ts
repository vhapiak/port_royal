/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../../game/ResultCode";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";

export class DrawPileView extends GameEventVisitor {

    gameModel: GameModel;
    drawPile: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.gameModel = gameModel;

        let title = scene.add.text(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.titleRow.y,
            'Deck',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        this.drawPile = scene.add.image(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.verticalLayer.deckRow.y,
            'shirt');

        this.drawPile.setInteractive().on('pointerup', DrawPileView.prototype.onClick, this);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) {
        this.updateState();
    }

    private onClick(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new DrawCardAction());
        }
    }

    private updateState(): void {
        if (this.isActive()) {
            this.drawPile.setAlpha(1.0);
            this.drawPile.input.cursor = 'pointer';
        } else {
            this.drawPile.setAlpha(0.5);
            this.drawPile.input.cursor = 'default';
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new DrawCardAction());
        return resultCode === ResultCode.Ok;
    }
}