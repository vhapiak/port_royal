/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../../game/ResultCode";

export class DrawPileView {

    gameModel: GameModel;
    drawPile: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        this.gameModel = gameModel;

        let title = scene.add.text(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.titleRow.y,
            'Deck',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        this.drawPile = scene.add.image(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.deckRow.y,
            'shirt');

        this.drawPile.setInteractive().on('pointerup', DrawPileView.prototype.onClick, this);

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
        } else {
            this.drawPile.setAlpha(0.5);
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new DrawCardAction());
        return resultCode === ResultCode.Ok;
    }
}