/// <reference types="phaser" />

import { Config } from "./ViewConfig";

export class DrawPileView {

    constructor(scene: Phaser.Scene) {
        let title = scene.add.text(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.titleRow.y,
            'Deck',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        let drawPile = scene.add.image(
            Config.mainLayer.verticalLayer.x, 
            Config.mainLayer.deckRow.y, 
            'shirt');
    }

}