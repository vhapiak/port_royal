/// <reference types="phaser" />

import { DrawPileView } from "./view/DrawPileView";
import { HarborView } from "./view/HarborView";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'game',
            active: true,
        });
    }

    preload(): void {
        this.load.image('main_bg', 'data/main_bg.png');
        this.load.image('shirt', 'data/cards/shirt.png');
        
        this.load.image('expedition_c2_p4_ss', 'data/cards/expedition_c2_p4_ss.png');
        this.load.image('pirate_c5_p1_s2', 'data/cards/pirate_c5_p1_s2.png');
        this.load.image('sloop_c1_s1', 'data/cards/sloop_c1_s1.png');
        this.load.image('trader_c3_p1_brig', 'data/cards/trader_c3_p1_brig.png');
    }

    create(): void {
        let background = this.add.image(0, 0, 'main_bg');
        background.setOrigin(0, 0);

        let drawPile = new DrawPileView(this);
        let habor = new HarborView(this);
    }
}