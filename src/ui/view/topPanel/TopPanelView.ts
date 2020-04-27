/// <reference types="phaser" />

import { GameModel } from "../../GameModel";
import { PlayersView } from "./PlayersView";

export class TopPanelView {
    
    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        let background = scene.add.image(0, 0, 'top_panel_bg');
        background.setOrigin(0, 0);

        let players = new PlayersView(scene, gameModel);
    }
}