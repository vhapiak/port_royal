/// <reference types="phaser" />

import { Config } from "./ViewConfig";

export class HarborView {

    constructor(scene: Phaser.Scene) {
        let title = scene.add.text(
            Config.mainLayer.harborLayer.x,
            Config.mainLayer.titleRow.y,
            'Harbor',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        const tmp = [
            'sloop_c1_s1',
            'pirate_c5_p1_s2',
            'sloop_c1_s1',
            'pirate_c5_p1_s2',
            'trader_c3_p1_brig',
            'expedition_c2_p4_ss',
            'pirate_c5_p1_s2',
            'trader_c3_p1_brig',
        ];

        const harborConfig = Config.mainLayer.harborLayer;
        const cardSize = Config.cardSize;
        const cardWidthWithOffset = cardSize.width + harborConfig.cardsOffset.width;
        const cardHeightWithOffset = cardSize.height + harborConfig.cardsOffset.height;
        const firstCollumnX = harborConfig.x - cardWidthWithOffset * harborConfig.cardsInRow / 2 + cardWidthWithOffset / 2;
        const firstCollumnY = Config.mainLayer.deckRow.y;

        for(let i = 0; i < tmp.length; ++i) {
            const row = Math.floor(i / harborConfig.cardsInRow);
            const col = i % harborConfig.cardsInRow;
            let card = scene.add.image(
                firstCollumnX + col * cardWidthWithOffset, 
                firstCollumnY + row * cardHeightWithOffset, 
                tmp[i]);
        }
    }

}